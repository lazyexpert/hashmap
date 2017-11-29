# Hashmap
Simple hashmap implementation with dynamic capacity.

# Time complexity
- Set - close to O(1)
- Get - close to O(1)
- Remove - close to O(1)

# Usage
```javascript
const HashMap = require('hashmap');
const hashmap = new HashMap();
hashmap.set('somekey', 'somevalue');

const value = hashmap.get('somekey');
```
