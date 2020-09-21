import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import differenceInHours from 'date-fns/differenceInHours';
import formatDistance from 'date-fns/formatDistance';

import TransactionHistoryExpenses from '../components/TransactionHistoryExpenses';

const ExpenseList = () => {
  const { cat } = useParams();
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);
  // const currentIdExpense = useSelector(
  //   state => state.isTransactionHistoryModal.idExpense
  // );
  const currentCategory = useSelector(state => {
    return state.categories.filter(category => {
      return category.id === cat;
    })[0];
  });
  let transactionsToThisExpense = transactions.filter(transaction => {
    return transaction.to === cat;
  });
  function sortTime(elementA, elementB) {
    if (elementA.time < elementB.time) {
      return 1;
    } else if (elementA.time > elementB.time) {
      return -1;
    } else {
      return 0;
    }
  }
  transactionsToThisExpense = transactionsToThisExpense.sort(sortTime);
  transactionsToThisExpense = transactionsToThisExpense.map(transaction => {
    return {
      ...transaction,
      stringTime:
        differenceInHours(Date.now(), new Date(transaction.time)) === 0
          ? 'this hour'
          : formatDistance(Date.now(), new Date(transaction.time)),
    };
  });
  const objectTime = {};
  transactionsToThisExpense.map(transaction => {
    const currentStringTime = transaction.stringTime;
    if (objectTime[currentStringTime]) {
      objectTime[currentStringTime].push(transaction);
    } else {
      objectTime[currentStringTime] = [transaction];
    }
  });
  console.log(objectTime);
  // Object.keys(objectTime).forEach(key => {
  //   console.log(key, objectTime[key]);
  // });
  return (
    <div>
      <h3>
        <Link to={'/'}>HOME</Link>
      </h3>
      <section>
        <h5>
          История ваших расходов в категории: <br />
          {currentCategory && currentCategory.name}
        </h5>
        {transactionsToThisExpense.length ? (
          Object.keys(objectTime).map(key => {
            return (
              <div>
                <h2 style={{ color: 'red' }}>{key}</h2>
                {objectTime[key].map(transaction => {
                  return <TransactionHistoryExpenses id={transaction._id} />;
                })}
              </div>
            );
          })
        ) : (
          <h2>История ваших покупок в данной категории пуста</h2>
        )}
        {/* {transactionsToThisExpense.length ? (
          transactionsToThisExpense.map(element => {
            return <TransactionHistoryExpenses id={element._id} />;
          })
        ) : (
          <h2>История ваших покупок в данной категории пуста</h2>
        )} */}
      </section>
    </div>
  );
};

export default ExpenseList;
