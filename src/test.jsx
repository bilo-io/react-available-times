import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AvailableTimes from './AvailableTimes.jsx';
import styles from './test.css';

import './reset.css';

function dateAt(dayInWeek, hours, minutes) {
  const date = new Date();
  while (date.getDay() > 0) {
    // reset to sunday
    date.setDate(date.getDate() - 1);
  }
  for (let i = 0; i < dayInWeek; i++) {
    date.setDate(date.getDate() + 1);
  }
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const calendars = [
  {
    id: 'private',
    title: 'Private',
    backgroundColor: '#666',
    foregroundColor: '#fff',
    selected: true,
  },
  {
    id: 'work',
    title: 'Work',
    backgroundColor: 'pink',
    foregroundColor: 'black',
    selected: true,
  },
];

const events = [
  {
    start: dateAt(0, 12, 30),
    end: dateAt(0, 14, 0),
    title: 'Lunch with Lo',
    calendarId: 'private',
  },
  {
    start: dateAt(1, 8, 5),
    end: dateAt(1, 10, 0),
    title: 'Breakfast club',
    calendarId: 'work',
  },
  {
    start: dateAt(1, 20, 0),
    end: dateAt(2, 10, 0),
    title: 'Night club',
    calendarId: 'private',
  },
  {
    start: dateAt(1, 8, 20),
    end: dateAt(1, 10, 30),
    title: 'Morning meeting',
    calendarId: 'private',
  },
  {
    start: dateAt(1, 0, 0),
    end: dateAt(2, 0, 0),
    title: 'Busy-time',
    calendarId: 'private',
    allDay: true,
  },
  {
    start: dateAt(1, 0, 0),
    end: dateAt(2, 0, 0),
    title: 'Foo bar',
    calendarId: 'private',
    allDay: true,
  },
  {
    start: dateAt(1, 0, 0),
    end: dateAt(2, 0, 0),
    title: 'what the',
    calendarId: 'work',
    allDay: true,
  },
  {
    start: dateAt(1, 0, 0),
    end: dateAt(2, 0, 0),
    title: 'Conference in some remote location',
    calendarId: 'work',
    allDay: true,
  },
  {
    start: dateAt(3, 8, 0),
    end: dateAt(3, 17, 0),
    title: 'Conference',
    calendarId: 'private',
  },
  {
    start: dateAt(4, 17, 0),
    end: dateAt(4, 19, 0),
    title: 'Pick up groceries',
    calendarId: 'private',
  },
  {
    start: dateAt(5, 10, 0),
    end: dateAt(5, 13, 20),
    title: 'Prepare presentation',
    calendarId: 'work',
  },
  {
    start: dateAt(5, 11, 0),
    end: dateAt(5, 12, 20),
    title: 'Remember to sign papers',
    calendarId: 'private',
  },
  {
    start: dateAt(5, 12, 0),
    end: dateAt(5, 14, 0),
    title: 'Taxi to airport',
    calendarId: 'work',
  },
  {
    start: dateAt(5, 13, 30),
    end: dateAt(5, 19, 25),
    title: 'Flight to Chicago',
    calendarId: 'private',
  },
];

const initialSelections = [
  {
    start: dateAt(1, 12, 0),
    end: dateAt(1, 14, 0),
  },
  {
    start: dateAt(4, 11, 0),
    end: dateAt(4, 12, 30),
  },
];


class Test extends Component {
  constructor() {
    super();
    this.state = {
      selections: initialSelections,
      selectedCalendars: ['private', 'work'],
      start: undefined,
      end: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCalendarSelected = this.handleCalendarSelected.bind(this);
    this.handleTimespanInit = this.handleTimespanInit.bind(this);
  }

  handleChange(selections) {
    this.setState({ selections });
  }

  handleCalendarSelected(selectedCalendars) {
    this.setState({ selectedCalendars });
  }

  handleTimespanInit({ start, end }) {
    this.setState({
      start,
      end,
    });
  }

  render() {
    const { selections, selectedCalendars } = this.state;

    const fullscreen = window.location.search === '?fullscreen';
    return (
      <div>
        <div className={styles.example}>
          {!fullscreen &&
            <div className={styles.intro}>
              <h1>Example #1</h1>
              <p>
                Uses the current date as the starting point.
              </p>
              {selections.length > 0 && (
                <div>
                  <h2>Selected ({selections.length})</h2>
                  <ul className={styles.selected}>
                    {selections.map(({ start, end }) => (
                      <li key={start}>
                        {start.toString()} - {end.toString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedCalendars.length > 0 && (
                <div>
                  <h2>Selected calendars</h2>
                  <ul className={styles.selected}>
                    {selectedCalendars.map((id) => <li key={id}>{id}</li>)}
                  </ul>
                </div>
              )}
              {this.state.start && (
                <div>
                  <h2>Timespan init</h2>
                  <ul className={styles.selected}>
                    <li>
                      {this.state.start.toString()} - {this.state.end.toString()}
                    </li>
                  </ul>
                </div>
              )}
              <a href="/?fullscreen">
                Go full screen
              </a>
            </div>
          }
          <AvailableTimes
            height={fullscreen ? undefined : 600}
            events={events}
            calendars={calendars}
            start={new Date()}
            onChange={this.handleChange}
            onCalendarSelected={this.handleCalendarSelected}
            onTimespanInit={this.handleTimespanInit}
            initialSelections={initialSelections}
          />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Test/>, document.getElementById('root'));
