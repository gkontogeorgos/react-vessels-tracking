import { API, API_BASE_URL } from "api/index";
import axios from "axios";

export const trackVessel = (
  period,
  dateOption,
  days,
  dateFrom,
  dateTo,
  vesselOption,
  vesselValue
) => {
  const isDaysOrDate =
    dateOption === "days"
      ? `days:${days}/`
      : `fromdate:${dateFrom?.toString()}/todate:${dateTo?.toString()}/`;

  return axios.post(
    `${API_BASE_URL}/exportvesseltrack/${API}/v:3/${
      period ? `period:${period}/${isDaysOrDate}` : isDaysOrDate
    }${vesselOption}:${vesselValue}/protocol:jsono`
  );
};

/* OK
PS01 - 200

*/

/* NOT OK - tested/not applied services to this API
PS02 + PS03 - 401
PS04 - 401
PS05 - 401
PS07 - 401
EV01 - 401
EV02 - 403
EV03 - 403
VD01 - 403
VD02 - 401
VD03 - 401
VI01 - 401
VI02 - 401
VI03 - 401
VI04 - 401
VI05 - 401
VI06 - 401
VI07 - 401
GI01 - 401
PU01 - 403
PU02 - 403
PU04 - 400
PU05 - 401
PU06 - 400
*/
