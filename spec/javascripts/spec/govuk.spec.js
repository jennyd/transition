describe('A GOVUK app', function() {
  "use strict"

  var GOVUK = window.GOVUK;

  it('finds modules', function() {

    var module = $('<div data-module="a-module"></div>');
    $('body').append(module);

    expect(GOVUK.find().length).toBe(1);
    expect(GOVUK.find()[0]).toMatch(module);

    module.remove();
  });

  it('finds modules in a container', function() {

    var module = $('<div data-module="a-module"></div>'),
        container = $('<div></div>').append(module);

    expect(GOVUK.find(container).length).toBe(1);
    expect(GOVUK.find(container)[0]).toMatch(module);
  });

  it('finds modules that are a container', function() {

    var module = $('<div data-module="a-module"></div>'),
        container = $('<div data-module="container-module"></div>').append(module);

    expect(GOVUK.find(container).length).toBe(2);
    expect(GOVUK.find(container)[1]).toMatch(container);
  });

  describe('when a module exists', function() {

    var callback;

    beforeEach(function() {
      callback = jasmine.createSpy();
      GOVUK.Modules.TestAlertModule = function() {
        var that = this;
        that.start = function(element) {
          callback(element);
        }
      };
    });

    afterEach(function() {
      delete GOVUK.Modules.TestAlertModule;
    });

    it('starts modules within a container', function() {
      var module = $('<div data-module="test-alert-module"></div>'),
          container = $('<div></div>').append(module);

      GOVUK.start(container);
      expect(callback).toHaveBeenCalled();
    });

    it('passes the HTML element to the module\'s start method', function() {
      var module = $('<div data-module="test-alert-module"></div>'),
          container = $('<div></div>').append(module);

      GOVUK.start(container);

      var args = callback.calls.argsFor(0);
      expect(args[0]).toMatch(module);
    });

    it('starts all modules that are on the page', function() {
      var modules = $(
            '<div data-module="test-alert-module"></div>\
             <strong data-module="test-alert-module"></strong>\
             <script data-module="test-alert-module"></script>'
          );

      $('body').append(modules);
      GOVUK.startAll();
      expect(callback.calls.count()).toBe(3);

      // Tear down
      modules.remove();
    });
  });

});
