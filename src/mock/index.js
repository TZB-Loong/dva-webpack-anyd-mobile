import Mock from 'mock';
import subjectApI from './subject';

Mock.mock(/\/subject\/array/,'get',subjectApI.getArray);

export default Mock;