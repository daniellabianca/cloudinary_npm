(function() {
  var Search, api, isEmpty, isNumber, ref;

  api = require('./api');

  ref = require('../utils'), isEmpty = ref.isEmpty, isNumber = ref.isNumber;

  Search = (function() {
    function Search() {
      this.query_hash = {
        sort_by: [],
        aggregate: [],
        with_field: []
      };
    }

    Search.instance = function() {
      return new Search;
    };

    Search.expression = function(value) {
      return this.instance().expression(value);
    };

    Search.max_results = function(value) {
      return this.instance().max_results(value);
    };

    Search.next_cursor = function(value) {
      return this.instance().next_cursor(value);
    };

    Search.aggregate = function(value) {
      return this.instance().aggregate(value);
    };

    Search.with_field = function(value) {
      return this.instance().with_field(value);
    };

    Search.sort_by = function(field_name, dir) {
      if (dir == null) {
        dir = 'asc';
      }
      return this.instance().sort_by(field_name, dir);
    };

    Search.prototype.expression = function(value) {
      this.query_hash.expression = value;
      return this;
    };

    Search.prototype.max_results = function(value) {
      this.query_hash.max_results = value;
      return this;
    };

    Search.prototype.next_cursor = function(value) {
      this.query_hash.next_cursor = value;
      return this;
    };

    Search.prototype.aggregate = function(value) {
      this.query_hash.aggregate.push(value);
      return this;
    };

    Search.prototype.with_field = function(value) {
      this.query_hash.with_field.push(value);
      return this;
    };

    Search.prototype.sort_by = function(field_name, dir) {
      var sort_bucket;
      if (dir == null) {
        dir = "desc";
      }
      sort_bucket = {};
      sort_bucket[field_name] = dir;
      this.query_hash.sort_by.push(sort_bucket);
      return this;
    };

    Search.prototype.to_query = function() {
      var k, ref1, v;
      ref1 = this.query_hash;
      for (k in ref1) {
        v = ref1[k];
        if (!isNumber(v) && isEmpty(v)) {
          delete this.query_hash[k];
        }
      }
      return this.query_hash;
    };

    Search.prototype.execute = function(options, callback) {
      if (callback === null) {
        callback = options;
      }
      options || (options = {});
      return api.search(this.to_query(), options, callback);
    };

    return Search;

  })();

  module.exports = Search;

}).call(this);

//# sourceMappingURL=search.js.map
