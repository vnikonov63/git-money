import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade.js';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import differenceInHours from 'date-fns/differenceInHours';
import formatDistance from 'date-fns/formatDistance';
import { StyledHeader } from '../../styled-components/StyledHeader.js';
import styles from './ExpenseList.module.scss';
import TransactionHistoryExpenses from '../../components/TransactionHistoryExpenses';
import { useDispatch } from 'react-redux';
import modalWindowCrudCategoryOpened from '../../redux/actions/modalWindow/openModalWindowCrudCategory';
import ModalWindowCrudCategory from './crudExpenseListModal';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cat } = useParams();
  const showCrudModal = useSelector(state => state.isCrudModalWindow.isOpened);
  const transactions = useSelector(state => state.transactions);
  const currentCategory = useSelector(state => {
    return state.categories.filter(category => {
      return category.id === cat;
    })[0];
  });
  const currentBalance = currentCategory.currentNumber;
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
          : formatDistance(Date.now(), new Date(transaction.time)) + ' ago',
    };
  });
  const objectTime = {};
  transactionsToThisExpense.forEach(transaction => {
    const currentStringTime = transaction.stringTime;
    if (objectTime[currentStringTime]) {
      objectTime[currentStringTime].push(transaction);
    } else {
      objectTime[currentStringTime] = [transaction];
    }
  });

  return (
    <Fade bottom cascade>
      <ModalWindowCrudCategory show={showCrudModal} />
      <div className={styles.container}>
        <StyledHeader>
          <div className={styles.arrowAndCatname}>
            <Link to={'/'} style={{ textDecoration: 'none', color: '#333333' }}>
              <i className="fas fa-arrow-left" />
            </Link>
            <h2 className={styles.header}>{currentCategory.name}</h2>
          </div>
          <p className={styles.totalSpentText}>
            <span role="img" aria-label="moneybag">
              💰
            </span>
            Потрачено за всё время: ${currentBalance}
          </p>
          <motion.button
            onClick={() => {
              dispatch(
                modalWindowCrudCategoryOpened('expense', 'editIcon', cat)
              );
            }}
            whileHover={{ scale: 1.1 }}
            className={styles.editCategory}
          >
            Изменить иконку
          </motion.button>
          <motion.button
            onClick={() => {
              dispatch(
                modalWindowCrudCategoryOpened('expense', 'editName', cat)
              );
            }}
            whileHover={{ scale: 1.1 }}
            className={styles.editCategory}
          >
            Изменить название
          </motion.button>
        </StyledHeader>

        <section>
          {transactionsToThisExpense.length ? (
            Object.keys(objectTime).map(key => {
              return (
                <div>
                  <h2 className={styles.timePoint}>{key}</h2>
                  {objectTime[key].map(transaction => {
                    return (
                      <TransactionHistoryExpenses
                        id={transaction._id}
                        key={transaction._id}
                      />
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div>
              <p className={styles.emptyWarning}>
                История трат в категории {currentCategory.name} пуста
              </p>
            </div>
          )}
        </section>
      </div>
    </Fade>
  );
};

export default ExpenseList;
