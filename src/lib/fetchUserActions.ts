export async function fetchTransactions() {
  try {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    return data.transactions;
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
