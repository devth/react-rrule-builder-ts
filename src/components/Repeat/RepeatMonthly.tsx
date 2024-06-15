import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  MonthBy, MonthlyRepeatDetails, RepeatDetails,
} from "./Repeat.types";
import SelectDayWeek from "./Selects/SelectDayWeek";
import SelectPosition from "./Selects/SelectPosition";
import SelectDayCalendar from "./Selects/SelectDayCalendar";

interface RepeatMonthlyProps {
  value: MonthlyRepeatDetails;
  onChange: (value: RepeatDetails) => void;
}

const RepeatMonthly = (
  {
    value,
    onChange,
  }: RepeatMonthlyProps,
) => {
  const maxDaysInMonth = 31;
  const [onRadio, setOnRadio] = useState<MonthBy>(MonthBy.BYMONTHDAY);
  const disabledOnBYSETPOS = onRadio === MonthBy.BYMONTHDAY;
  const disabledOnBYMONTHDAY = onRadio === MonthBy.BYSETPOS;

  // TODO GET THIS FROM MAIN COMPONENT - this is just a placeholder
  const size = 400;

  return (
    <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Every</Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          type="number"
          value={value?.interval}
          onChange={(e) => onChange({ interval: parseInt(e.target.value, 10) })}
        />
        <Typography>month(s)</Typography>

      </Stack>
      <RadioGroup
        name="monthly"
        value={onRadio}
        onChange={(e) => setOnRadio(e.target.value as MonthBy)}
        sx={{ width: "100%" }}
      >
        <Stack direction="column" spacing={2} alignItems="flex-start" width="100%">
          {/* ON DAY SECTION */}
          <Box display="inline-flex" alignItems="center">
            <FormControlLabel
              value={MonthBy.BYMONTHDAY}
              control={<Radio />}
              label={(
                <Typography
                  sx={{ color: disabledOnBYMONTHDAY ? "text.disabled" : "text.primary", paddingLeft: 2 }}
                >
                  On Day
                </Typography>
              )}
              sx={{ minWidth: 120, marginRight: 2 }}
            />
            <SelectDayCalendar value={value} onChange={onChange} maxDaysInMonth={maxDaysInMonth} disabled={disabledOnBYMONTHDAY} />
          </Box>
          {/* ON THE SECTION */}
          <Stack direction={size < 301 ? "column" : "row"} spacing={4} alignItems={size < 301 ? "" : "center"} sx={{ width: "100%" }}>
            <Box sx={{ minWidth: 120, marginRight: 2 }}>
              <FormControlLabel
                value={MonthBy.BYSETPOS}
                control={<Radio />}
                label={(
                  <Typography
                    sx={{ color: disabledOnBYSETPOS ? "text.disabled" : "text.primary", paddingLeft: 2 }}
                  >
                    On The
                  </Typography>
                )}
              />
            </Box>
            <Box
              sx={{
                minWidth: 120,
                marginX: { xs: 0, sm: 2 },
                marginY: { xs: 2, sm: 0 },
                width: size < 301 ? "100%" : "auto",
              }}
            >
              <SelectPosition value={value} onChange={onChange} disabled={disabledOnBYSETPOS} />
            </Box>
            <Box sx={{ minWidth: 120, marginX: { xs: 0, sm: 2 }, width: size < 301 ? "100%" : "auto" }}>
              <SelectDayWeek value={value} onChange={onChange} disabled={disabledOnBYSETPOS} />
            </Box>
          </Stack>
        </Stack>
      </RadioGroup>

    </Stack>
  );
};
export default RepeatMonthly;
