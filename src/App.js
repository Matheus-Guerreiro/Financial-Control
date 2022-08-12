import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";

function App() {
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

 const formatValue = (value) => {
   return  value.replaceAll(".", "").replace(",", ".")
 }
 
 const formatCurrency = (value) => {
  return  new Intl.NumberFormat('pt-BR', {   style: 'currency',   currency: 'BRL', }).format(value);
  
 }


  useEffect(() => {
    const amountExpanse = transactionsList
      .filter((item) => item.expense)
      .map((transactions) => Number(formatValue(transactions.amount)));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transactions) => Number(formatValue(transactions.amount)));

    const expense = amountExpanse.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

    setExpense(formatCurrency(expense));
    setIncome(formatCurrency(income));
    setTotal(`${Number(income) < Number(expense) ? "-" : ""} ${formatCurrency(total)}`);
  }, [transactionsList]);

  function handleAdd(transactions) {
    const newTransactions = [...transactionsList, transactions];

    setTransactionsList(newTransactions);

    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  }

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form
        handleAdd={handleAdd}
        transactionList={transactionsList}
        setTransactionList={setTransactionsList}
      />
    </>
  );
}

export default App;
