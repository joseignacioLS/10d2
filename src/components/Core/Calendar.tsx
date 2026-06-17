import { useState } from "react";
import { Temporal } from "temporal-polyfill";
import { Button } from "./Button";
import styles from "./Calendar.module.css";

type Props = {
  events: {
    date: Temporal.PlainDate;
    onClick: () => void;
  }[];
};

export const Calendar: React.FC<Props> = ({ events }) => {
  const [today] = useState(Temporal.Now.plainDateISO());
  const [selectedWeek, setSelectedWeek] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.calendar}>
        <div className={styles.week}>
          <div>
            {today.add({ days: selectedWeek * 7 + 1 - today.dayOfWeek }).year}
          </div>
          <div>L</div>
          <div>M</div>
          <div>X</div>
          <div>J</div>
          <div>V</div>
          <div>S</div>
          <div>D</div>
        </div>
        {[-2, -1, 0, 1, 2].map((deltaWeek) => {
          const delta = deltaWeek + selectedWeek;
          const weekDay = today.add({ weeks: delta });
          const monday = weekDay.subtract({ days: weekDay.dayOfWeek - 1 });
          return (
            <div key={deltaWeek} className={styles.week}>
              <div>
                {monday.toLocaleString("es", {
                  month: "short",
                })}
              </div>
              {[0, 1, 2, 3, 4, 5, 6].map((deltaDay) => {
                const day = monday.add({ days: deltaDay });
                const compareWithToday = Temporal.PlainDate.compare(day, today);
                const isToday = compareWithToday === 0;
                const isFuture = compareWithToday > 0;
                const event = events.find(
                  ({ date }) => Temporal.PlainDate.compare(day, date) === 0,
                );
                const splitMonth = day.day === 1 && deltaDay !== 0;
                const firstWeek = day.day <= day.dayOfWeek;
                return (
                  <div
                    key={deltaDay}
                    className={`${event ? styles.event : ""} ${isToday ? styles.today : ""} ${
                      splitMonth ? styles.split : ""
                    } ${firstWeek ? styles.firstWeek : ""} ${isFuture ? styles.future : ""}`}
                    onClick={event?.onClick}
                  >
                    {day.day}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={styles.controls}>
        <Button
          className={styles.roundBtn}
          onClick={() => {
            setSelectedWeek((v) => v - 1);
          }}
        >
          <img src="/chev-up.svg" />
        </Button>
        <Button className={styles.roundBtn} onClick={() => setSelectedWeek(0)}>
          <img src="/reset.svg" />
        </Button>
        <Button
          className={styles.roundBtn}
          onClick={() => setSelectedWeek((v) => v + 1)}
        >
          <img src="/chev-down.svg" />
        </Button>
      </div>
    </div>
  );
};
