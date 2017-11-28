const Pair = require('./pair');
const HashMap = require('./index');

const expect = require('chai').expect;

describe('App', function() {
  describe('Pair', function() {
    describe('constructor', function() {
      it('should create instance correctly', function() {
        const pair = new Pair('a', 'b');

        expect(pair.key).to.be.equal('a');
        expect(pair.value).to.be.equal('b');
      });
    });
  });

  describe('HashMap', function() {
    describe('constructor', function() {
      it('should create instance correctly', function() {
        const hashmap = new HashMap();

        expect(hashmap.buckets).to.be.an('array');
      });
    });

    describe('get/set', function() {
      it('should get and set value correctly', function() {
        const hashmap = new HashMap();
        hashmap.set('a', 'b');
        const value = hashmap.get('a');

        expect(value).to.be.equal('b');
      });

      it('should remain working for longer keys', function() {
        const hashmap = new HashMap();
        hashmap.set('allaloloshechka', 'beta');
        const value = hashmap.get('allaloloshechka');

        expect(value).to.be.equal('beta');
      });

      it('should replace old value', function() {
        const hashmap = new HashMap();
        hashmap.set('allaloloshechka', 'beta');
        hashmap.set('allaloloshechka', 'teta');
        const value = hashmap.get('allaloloshechka');

        expect(value).to.be.equal('teta');
      });
    });

    describe('Dynamic capacity', function() {
      it('should increase capacity and remain working', function() {
        const hashmap = new HashMap();
        hashmap.capacity = 1;
        hashmap.set('testing', 'vvval');
        const value = hashmap.get('testing');

        expect(hashmap.capacity).not.to.be.equal(1);
        expect(value).to.be.equal('vvval');
      });

      it('should increase capacity and remain working', function() {
        const hashmap = new HashMap();
        hashmap.set('testing', 'vvval');

        for (let i = 0; i < 100; i ++) {
          hashmap.set(`${i}a${i}b${i}`, i);
        }
        const value = hashmap.get('testing');
        
        expect(hashmap.capacity).not.to.be.equal(10);
        expect(value).to.be.equal('vvval');
      });
    });
  });
});
