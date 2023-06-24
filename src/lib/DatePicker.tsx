import { useRef, useCallback } from "react";
import { Calendar } from "../system/icons";
import { Empty } from "../utils";

interface DatePickerProps {
    currentDate: Date;
    allowNext?: boolean;
    allowPrev?: boolean;
    static?: boolean;
    onDateChanged?: (changed: OnDateChangedArgs) => void;
}

interface OnDateChangedArgs {
    date: Empty<string>;
    timestamp: Empty<number>;
}

export const DatePicker = (props: DatePickerProps) => {
    const { onDateChanged } = props;
    const dateInputRef = useRef<HTMLInputElement>(null);
    const handleDateChanged = useCallback(() => {
        console.log('making new callback');
        onDateChanged && onDateChanged({
            date: dateInputRef.current?.value,
            timestamp: dateInputRef.current?.valueAsNumber
        });
    }, [onDateChanged]);

    return <div className="t-date-picker">
        {!props.static &&
            <input type="date" className="t-input" ref={dateInputRef} onChange={handleDateChanged} />}
        {props.static &&
            <>
                <span className="date-display">{props.currentDate.toDateString()}</span>
                <Calendar className="date-display" />
            </>
        }
    </div>
};
