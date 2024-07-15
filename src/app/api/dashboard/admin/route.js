import { execQuery } from "../../commonApi";

export async function GET() {

  const res = await execQuery(`SELECT * FROM user  WHERE user_access_control = 0 ORDER BY user_seq ASC`);
  let users = res.map(user => {
    return { user_seq: user.user_seq, user_name: user.user_name + "(" + user.user_id + ")" }
  });
  const promises = users.map(async (user) => {
    const count = await execQuery(`
      SELECT COUNT(*) as call_count,
             SUM(CASE WHEN result = '자료요청' THEN 1 ELSE 0 END) as talk_count
      FROM call_result
      WHERE user_seq = ${user.user_seq}
    `);
    return { ...user, call_count: count[0]['call_count'], talk_count: count[0]['talk_count'] === null ? 0 : count[0]['talk_count'] };
  });

  const result = await Promise.all(promises);
  return Response.json(result);
}


export async function POST(req, res) {
  const { startDate, endDate } = await req.json();
  const userRes = await execQuery(`SELECT user_seq, user_name FROM user WHERE user_access_control = 0 ORDER BY user_seq ASC`);
  let sql = '';
  userRes.forEach(user => sql += `MAX(CASE WHEN userSeq = ${user.user_seq} THEN callCnt ELSE 0 END) AS '${user.user_name}', `);

  sql = sql.replace(/,\s*$/, "");
  

  const result = await execQuery(`
    WITH RECURSIVE DateRange AS (
        SELECT MIN(DATE(create_date)) AS day
        FROM call_result
        UNION ALL
        SELECT DATE_ADD(day, INTERVAL 1 DAY)
        FROM DateRange
        WHERE day < (SELECT MAX(DATE(create_date)) FROM call_result)
    ),
    CallCounts AS (
        SELECT
            DR.day,
            U.user_seq as userSeq,
            COALESCE(COUNT(CR.call_result_seq), 0) AS callCnt
        FROM DateRange DR
        CROSS JOIN user U
        LEFT JOIN call_result CR ON U.user_seq = CR.user_seq AND DATE(CR.create_date) = DR.day
        WHERE DR.day BETWEEN '${startDate}' AND '${endDate}'
        GROUP BY DR.day, U.user_seq
    )
    SELECT
        day,
        ${ sql }
    FROM CallCounts
    GROUP BY day
    ORDER BY day;
  `);

  return Response.json({ data: result, user: userRes });
}