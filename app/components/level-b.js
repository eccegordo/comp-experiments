import Ember from 'ember';
import MyComponent from 'comp-experiments/mixins/my-component';


function treeBind(path) {
  console.log('treeBind this=', this);
}

export default Ember.Component.extend(MyComponent, {
  name: 'b',

  parentName: treeBind('level-a[name]')

});
