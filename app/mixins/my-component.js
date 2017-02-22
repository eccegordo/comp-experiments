import Ember from 'ember';




function findComponent(name, list) {
  return list.filter((i, p) => {
    console.log('p=', p);
    console.log('p.constructor.toString()=', p.constructor.toString());
    console.log('match=', p.constructor.toString().match(name));
    return p.constructor.toString().match(name) !== null;
  })[0];

}

function componentById(self, id) {
  if(id instanceof HTMLElement) {
    id = id.id;
  }
  console.log('id=', id);
  console.log('comp=', Ember.getOwner(self).lookup('-view-registry:main')[id]);
  return Ember.getOwner(self).lookup('-view-registry:main')[id];
}



export default Ember.Mixin.create({
  //
  // init(){
  //   this._super(...arguments);
  //   var self = this;
  //   Ember.run.later(()=>{
  //
  //
  //     var parents = $(self.$()).parents('.ember-view').map((i, d) => {
  //       return componentById(self, d.id);
  //     }).filter((i, d)=>{return d !== null;})
  //
  //     var card = findComponent('ist-card/ist-tabs/0/ist-tab', parents);
  //
  //     console.log('parents=', parents);
  //     // debugger;
  //   }, 2000)
  //   //debugger;
  // },

  myPath: null,


  init(){
    this._super(...arguments);

    var id = this.constructor.toString().match(/component:([a-z0-9-]+):/)[1];

    if (this.parentView) {
      this.set('myPath', this.parentView.get('myPath') + '/' + id);
      this.parentView.addDescendant(this.get('name'));
    } else {
      this.set('myPath',  '//' + id);
    }

    console.log('init=', this.get('name'), this.parentView != null, this.childViews.length, "PATH: ",this.get('myPath') );


  },

  descendants: null,
  addDescendant(obj){
    var descendants = this.get("descendants");


    if (descendants) {
      descendants.push(obj);
    } else {
      this.set('descendants', Ember.A([obj]));
    }

    if (this.parentView){this.parentView.addDescendant(obj);}

  },


  didReceiveAttrs(){
    this._super(...arguments);
    console.log('  didReceiveAttrs=', this.get('name'));
  //  this.printTrace([]);
  },

  willRender(){
    this._super(...arguments);
    console.log('    willRender=', this.get('name'), this.parentView != null, this.childViews.length );
  },

  didInsertElement(){
    this._super(...arguments);
    console.log('      didInsertElement=', this.get('name'), this.parentView != null, this.childViews.length);
  },

  didRender(){
    this._super(...arguments);
    console.log('        didRender=', this.get('name'), this.parentView != null, this.childViews.length);
    console.log('        descendants=',   this.get('descendants'));
  },


  printTrace(list){
    var next = list.concat([  this.constructor.toString()   ]);
    console.log('trace=', this.get('name'), list);
    if (this.parentView) {
      this.parentView.printTrace(next);
    }

  },

  // init(){
  //   this._super(...arguments);
  //   console.log('init=', this.get('name'));
  // },

});


//
// Ember.MyComponent = Ember.Component.extend({
//
// });
