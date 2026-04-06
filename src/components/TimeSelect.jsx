import PropTypes from "prop-types";

import { AlertMessage } from "./index";

const TimeSelect = ({ error, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="time"
        className="text-brand-dark-blue text-[14px] font-semibold"
      >
        Horário
      </label>

      <select
        name="time"
        id="time"
        className="w-full rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] focus:outline-none"
        {...rest}
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {error && <AlertMessage>{error.message}</AlertMessage>}
    </div>
  );
};

export default TimeSelect;

TimeSelect.propTypes = {
  error: PropTypes.object,
};
