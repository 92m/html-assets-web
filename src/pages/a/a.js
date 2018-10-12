import vue from 'vue'
import { dep1 } from '../../libs/dep-1'
import 'assets/css/reset.css'
import './a.scss'
import './a.less'
function test1() {
  console.log('dep', dep1)
  new vue()
}

test1()
