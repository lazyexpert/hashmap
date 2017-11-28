const LinkedList = require('linked-list');

const Pair = require('./pair');

class HashMap {
  constructor() {
    this.buckets = [];

    this.capacity = 100;
  }

  set(key, value) {
    const hash = this._getHash(key);
    
    if (!this.buckets[hash]) {
      this.buckets[hash] = new LinkedList();
    }

    if (!this._tryToReplaceKey(this.buckets[hash], key, value)) {
      const pair = new Pair(key, value);
      this.buckets[hash].add(pair);
    }
  }

  get(key, value) {
    const hash = this._getHash(key);

    if (!this.buckets[hash]) {
      return -1;
    }

    return this._getValueFromBucket(this.buckets[hash], key);
  }

  _getValueFromBucket(bucket, key) {
    let current = bucket.head;

    while (current) {
      if (current.value.key === key) {
        return current.value.value;
      }

      current = current.next;
    }

    return -1;
  }

  _tryToReplaceKey(bucket, key, value) {
    let current = bucket.head;

    while (current) {
      if (current.value.key === key) {
        current.value.value = value;
        return true;
      }

      current = current.next;
    }

    return false;
  }

  _getHash(key) {
    return key
      .split('')
      .map(el => el.charCodeAt(0))
      .reduce( (a,b) => a + b, 0) % this.capacity;
  }
}

module.exports = HashMap;
