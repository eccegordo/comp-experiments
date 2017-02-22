import Ember from 'ember';
import MyComponentMixin from 'comp-experiments/mixins/my-component';
import { module, test } from 'qunit';

module('Unit | Mixin | my component');

// Replace this with your real tests.
test('it works', function(assert) {
  let MyComponentObject = Ember.Object.extend(MyComponentMixin);
  let subject = MyComponentObject.create();
  assert.ok(subject);
});
