import Ember from 'ember';

export default Ember.Route.extend({
  shoppingCart: Ember.inject.service(),

  model() {
    return this.store.findAll('category');
  },

  actions: {
    saveProduct(params) {
      var newProduct = this.store.createRecord('product', params);
      var category = params.category;
      category.get('product').addObject(newProduct);
      newProduct.save().then(function() {
        return category.save();
      });
      this.transitionTo('category', params.category);
    },

    destroyCategory(category) {
      var product_deletions = category.get('product').map(function(product) {
        return product.destroyRecord();
      });
      Ember.RSVP.all(product_deletions).then(function() {
        return category.destroyRecord();
      });
      this.transitionTo('index');
      }
  }
});
