import React, { useState } from 'react';
    import { ref, push } from 'firebase/database';
    import { rtdb } from '../../firebase';
    import { format, isToday } from 'date-fns';

    function RightSidebar({ scheduledPrayers, setScheduledPrayers, handleOpenPrayerModal }) {

      const getPrayersForToday = () => {
        return scheduledPrayers.filter(prayer => {
          if (prayer.scheduleType === 'daily') {
            return true;
          } else if (prayer.scheduleType === 'once') {
            return isToday(new Date(prayer.scheduledDate));
          }
          return false;
        });
      };

      return (
        <div className="sidebar right-sidebar">
          <h3>Scheduled Prayers</h3>
          <ul>
            {getPrayersForToday().map(prayer => (
              <li key={prayer.id}>
                <h4>{prayer.title}</h4>
                <p>{prayer.description}</p>
                <button onClick={() => handleOpenPrayerModal(prayer.id)} style={{ marginLeft: '10px' }}>Edit</button>
              </li>
            ))}
          </ul>
          <button onClick={() => handleOpenPrayerModal()}>Schedule Prayer</button>
        </div>
      );
    }

    export default RightSidebar;
