import React from 'react';
import './StatsCounter.css';

const stats = [
  { count: '99', text: 'Success in getting happy customer' },
  { count: '99', text: 'Projects delivered on time' },
  { count: '99', text: 'Years of industry experience' },
  { count: '99', text: 'Expert team members' },
];

const StatsCounter = () => {
  return (
    <div className="cr_custom_bottom_container">
      {stats.map((stat, i) => (
        <div className='cr_content_div' key={i}>
          <span style={{ color: '#1842b6', fontWeight: '700' }}>{stat.count}</span>
          <span>{stat.text}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;