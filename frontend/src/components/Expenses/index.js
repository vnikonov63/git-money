import React from 'react';
import { useSelector } from 'react-redux';
import AddCategory from '../AddCategory';
import Category from '../Category';
import styles from './Expenses.module.css';

const Expenses = () => {
  const expenditures = useSelector(state =>
    state.categories.filter(category => category.value === 'expenditure')
  );
  return (
    <div className={styles.expenses}>
      <h4>Расходы</h4>
      <div className={styles.items_container}>
        {expenditures &&
          expenditures.map(expense => {
            return (
              <Category
                value={expense.value}
                key={expense.id}
                id={expense.id}
              />
            );
          })}
        <AddCategory value="expenditure" />
      </div>
    </div>
  );
};

export default Expenses;
