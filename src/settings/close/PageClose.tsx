import classes from './PageClose.module.css';
import { useNavigate } from 'react-router-dom';

const PageClose = () => {
  const navigateTo = useNavigate();
  const onClose = () => {
    navigateTo('/game');
  };
  return (
    <div className={classes.close} onClick={onClose}>
      <span className={'material-icons-sharp ' + classes.icon}>clear</span>
    </div>
  );
};

export default PageClose;
