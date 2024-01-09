import { AxiosError } from 'axios';
import * as _ from 'lodash';
export const getErrorMessage = (error: AxiosError<any, any>) => {
   
  return _.get(error, 'response.data.description', "Something's wrong");
};
 