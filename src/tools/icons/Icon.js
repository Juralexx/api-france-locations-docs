
import CaretDown from './CaretDown';
import Cross from './Cross';
import CrossCircle from './CrossCircle';
import DoubleArrowLeft from './DoubleArrowLeft';
import Search from './Search';

const Icon = (props) => {
    switch (props.name) {
        case 'CaretDown':
            return <CaretDown {...props} />;
        case 'DoubleArrowLeft':
            return <DoubleArrowLeft {...props} />;
        case 'Cross':
            return <Cross {...props} />;
        case 'CrossCircle':
            return <CrossCircle {...props} />;
        case 'Search':
            return <Search {...props} />;

        default:
            return <CaretDown {...props} />;
    }
};

export default Icon;