document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const monthSelect = document.getElementById('month');
  const yearSelect = document.getElementById('year');
  const amountInput = document.getElementById('amount');
  const expenseChartCanvas = document.getElementById('expense-chart');

  let myChart = null;

  // Generate year options dynamically
  for (let year = 2020; year <= 2040; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  // Get default categories object
  const getEmptyCategories = () => ({
    Housing: 0,
    Food: 0,
    Transportation: 0,
    Bills: 0,
    Miscellaneous: 0
  });

  // Load data from LocalStorage
  function getExpensesFromStorage(month, year) {
    const key = `${month}-${year}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return getEmptyCategories();
  }

  // Save to LocalStorage
  function saveExpensesToStorage(month, year, expenses) {
    const key = `${month}-${year}`;
    localStorage.setItem(key, JSON.stringify(expenses));
  }

  // Handle Chart Update
  function updateChart(expenses) {
    const labels = Object.keys(expenses);
    const data = Object.values(expenses);
    const backgroundColors = [
      '#e94c8e', // Housing - Pink/Magenta (matching image exactly)
      '#53c653', // Food - Green (matching image exactly)
      '#fcd34d', // Transportation - Yellow (matching image exactly)
      '#3b82f6', // Bills - Blue (matching image exactly)
      '#f97316'  // Miscellaneous - Orange (matching image exactly)
    ];

    if (myChart) {
      myChart.data.datasets[0].data = data;
      myChart.update();
    } else {
      myChart = new Chart(expenseChartCanvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: backgroundColors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: false, // Image has rectangles, not circles
                boxWidth: 20
              }
            }
          }
        }
      });
    }
  }

  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const selectMonth = monthSelect.value;
    const selectYear = yearSelect.value;
    const category = event.target.category.value;
    const amount = parseFloat(event.target.amount.value);

    if (!selectMonth || !selectYear) {
      alert('Month or year not selected');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const expenses = getExpensesFromStorage(selectMonth, selectYear);
    
    // Add new amount
    expenses[category] += amount;

    // Save
    saveExpensesToStorage(selectMonth, selectYear, expenses);
    
    // Exact console log output as image: {Housing: 1100, Food: 120, Transportation: 500, Bills: 0, Miscellaneous: 0}
    console.log(expenses);

    // Update the chart
    updateChart(expenses);

    // Reset input
    amountInput.value = '';
  }

  // Listeners
  expenseForm.addEventListener('submit', handleFormSubmit);

  function handleDateChange() {
    const expenses = getExpensesFromStorage(monthSelect.value, yearSelect.value);
    updateChart(expenses);
  }

  monthSelect.addEventListener('change', handleDateChange);
  yearSelect.addEventListener('change', handleDateChange);

  // Set default month and year based on current date
  function setDefaultDate() {
    const now = new Date();
    const initialMonth = now.toLocaleString('default', { month: 'long' });
    const initialYear = now.getFullYear();
    
    monthSelect.value = initialMonth;
    yearSelect.value = initialYear;

    // Load initial chart
    handleDateChange();
  }

  setDefaultDate();
});