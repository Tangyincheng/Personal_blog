import axios from 'axios';
import servicePath from '../config/apiUrl';

function Counter(props) {

  axios({
    method: 'post',
    url: servicePath.updateArticleView,
    data: props,
    header: { 'Access-Control-Allow-Origin': '*' },
    withCredentials: true
  }).then(
    res => {
      // console.log('res', res)
    }
  )

}

export default Counter;