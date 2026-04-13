     const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000);
    const dueDateEl = document.getElementById('dueDate');
    const timeRemainingEl = document.getElementById('timeRemaining');
    const statusTextEl = document.getElementById('statusText');
    const toggle = document.getElementById('completeToggle');
    const title = document.querySelector('.title');

    function formatDueDate(date) {
      return 'Due ' + date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }

    function getTimeRemaining() {
      const now = new Date();
      const diff = dueDate - now;
      const abs = Math.abs(diff);
      const minutes = Math.floor(abs / 60000);
      const hours = Math.floor(abs / 3600000);
      const days = Math.floor(abs / 86400000);

      if (abs < 60000) return diff >= 0 ? 'Due now!' : 'Overdue just now';
      if (diff < 0) {
        if (days >= 1) return `Overdue by ${days} day${days === 1 ? '' : 's'}`;
        if (hours >= 1) return `Overdue by ${hours} hour${hours === 1 ? '' : 's'}`;
        return `Overdue by ${minutes} minute${minutes === 1 ? '' : 's'}`;
      }
      if (days > 1) return `Due in ${days} days`;
      if (days === 1) return 'Due tomorrow';
      if (hours >= 1) return `Due in ${hours} hour${hours === 1 ? '' : 's'}`;
      return `Due in ${minutes} minute${minutes === 1 ? '' : 's'}`;
    }

    dueDateEl.dateTime = dueDate.toISOString();
    dueDateEl.textContent = formatDueDate(dueDate);
    timeRemainingEl.textContent = getTimeRemaining();

    setInterval(() => {
      timeRemainingEl.textContent = getTimeRemaining();
    }, 60000);

    toggle.addEventListener('change', function () {
      if (this.checked) {
        title.classList.add('done');
        statusTextEl.textContent = 'Done';
      } else {
        title.classList.remove('done');
        statusTextEl.textContent = 'In Progress';
      }
    });

    document.getElementById('editBtn').addEventListener('click', () => {
      console.log('edit clicked');
    });

    document.getElementById('deleteBtn').addEventListener('click', () => {
      alert('Delete clicked');
    });