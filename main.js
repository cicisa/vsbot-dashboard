
document.getElementById('btn_find_event').addEventListener('click', () => {
  const data = {
    action: 'find_event',
    name: document.getElementById('event_name').value,
    date: document.getElementById('event_date').value,
    time: document.getElementById('event_time').value,
    sport: document.getElementById('event_sport').value,
  };
  window.postMessage(data, '*');
});
