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

export async function fetchUserActions(email: string) {
  try {
    const response = await fetch("/api/currentUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
