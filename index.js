const LinkedList = require('linked-list');

const Pair = require('./pair');

class HashMap {
  constructor() {
    this.buckets = [];

    this.usedHashNodes = 0;
    this.capacity = 10;
  }

  set(key, value) {
    const hash = this._getHash(key);

    if (!this.buckets[hash]) {
      this.buckets[hash] = new LinkedList();
      this.usedHashNodes++;
    }

    if (!this._tryToReplaceKey(this.buckets[hash], key, value)) {
      const pair = new Pair(key, value);
      this.buckets[hash].add(pair);
    }

    if (this.usedHashNodes === this.capacity) {
      this._increaseCapacity();
    }
  }

  get(key, value) {
    const hash = this._getHash(key);

    if (!this.buckets[hash]) {
      return -1;
    }

    return this._getValueFromBucket(this.buckets[hash], key);
  }

  remove(key) {
    const hash = this._getHash(key);
    
    if (!this.buckets[hash]) {
      return -1;
    }
    
    let current = this.buckets[hash].head;
    let previous = null;

    while(current) {
      if (current.value.key === key) {
        if (!previous) {
          this.buckets[hash] = current.next;
          if (!this.buckets[hash]) {
            this.usedHashNodes--;
          }
        } else {
          previous.next = current.next;
        }
      }

      previous = current;
      current = current.next;
    }

    return -1;
  }

  _increaseCapacity() {
    const oldBuckets = this.buckets;
    const oldCapacity = this.capacity;

    this.usedHashNodes = 0;
    this.buckets = [];
    this.capacity *= 2;

    for (let i = 0; i < oldCapacity; i++) { 
      const list = oldBuckets[i];
      let current = list.head;

      while(current) {
        const pair = current.value;
        this.set(pair.key, pair.value);
        current = current.next;
      }
    }
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
