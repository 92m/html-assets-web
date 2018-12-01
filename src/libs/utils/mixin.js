import OBJLoader2 from './loaders/OBJLoader2'
import LoaderSupport from './loaders/LoaderSupport'
import MTLLoader from './loaders/MTLLoader'
import TrackballControls from './controls/TrackballControls'

export function initMixin(THREE) {
  MTLLoader(THREE)
  LoaderSupport(THREE)
  OBJLoader2(THREE)
  TrackballControls(THREE)
}
