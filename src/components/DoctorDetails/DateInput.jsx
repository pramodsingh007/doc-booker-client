import { useState } from 'react';

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value);

    // Check if the selected day is a Monday (where Sunday is 0 and Monday is 1)
    if (inputDate.getDay() === 1) {
      setSelectedDate(inputDate.toISOString().split('T')[0]);
      // Continue with your logic
    } else {
      alert('Invalid day. Please select a Monday.');
      // Clear the input field or handle the invalid selection
      setSelectedDate('');
    }
  };

  return (
    
      
      <input
        className='h-12 w-full border p-2 outline-none rounded-md'
        type="date"
        id="mondayOfMonth"
        value={selectedDate}
        onChange={handleDateChange}
      />
   
  );
};

export default DateInput;
