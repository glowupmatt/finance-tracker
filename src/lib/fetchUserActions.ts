export async function fetchTransactions(page = 1, pageSize = 10) {
  try {
    const response = await fetch(
      `/api/transactions?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchPots() {
  try {
    const response = await fetch("/api/pots");
    const data = await response.json();
    return data.pots;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchBudgets() {
  try {
    const response = await fetch("/api/budgets");
    const data = await response.json();
    return data.budgets;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRecurringPayments() {
  try {
    const response = await fetch("/api/recurringPayments");
    const data = await response.json();
    return data.recurringPayments;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserActions() {
  try {
    const response = await fetch("/api/currentUser");
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
}
