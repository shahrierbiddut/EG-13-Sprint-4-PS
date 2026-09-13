/**
 * 1. Isomorphic Strings
 */
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const sToT = new Map();
    const tToS = new Map();

    for (let i = 0; i < s.length; i++) {
        const charS = s[i];
        const charT = t[i];

        if (
            (sToT.has(charS) && sToT.get(charS) !== charT) ||
            (tToS.has(charT) && tToS.get(charT) !== charS)
        ) {
            return false;
        }

        sToT.set(charS, charT);
        tToS.set(charT, charS);
    }

    return true;
};


/**
 * 2. Word Pattern
 */
var wordPattern = function(pattern, s) {
    const words = s.split(" ");

    if (pattern.length !== words.length) {
        return false;
    }

    const patternToWord = new Map();
    const wordToPattern = new Map();

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        const word = words[i];

        if (
            (patternToWord.has(char) && patternToWord.get(char) !== word) ||
            (wordToPattern.has(word) && wordToPattern.get(word) !== char)
        ) {
            return false;
        }

        patternToWord.set(char, word);
        wordToPattern.set(word, char);
    }

    return true;
};


/**
 * 3. Find the Difference
 */
var findTheDifference = function(s, t) {
    const count = new Map();

    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }

    for (const char of t) {
        if (!count.has(char) || count.get(char) === 0) {
            return char;
        }

        count.set(char, count.get(char) - 1);
    }

    return "";
};


/**
 * 4. Reverse Linked List
 */
var reverseList = function(head) {
    let previous = null;
    let current = head;

    while (current !== null) {
        const next = current.next;

        current.next = previous;
        previous = current;
        current = next;
    }

    return previous;
};


/**
 * 5. Middle of the Linked List
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};


/**
 * 6. Product of Array Except Self
 */
var productExceptSelf = function(nums) {
    const result = new Array(nums.length).fill(1);

    let prefix = 1;

    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    let suffix = 1;

    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};


/**
 * 7. Remove Nth Node From End of List
 */
var removeNthFromEnd = function(head, n) {
    const dummy = { next: head };

    let fast = dummy;
    let slow = dummy;

    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    while (fast.next !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;

    return dummy.next;
};


/**
 * 8. Find First and Last Position of Element in Sorted Array
 */
var searchRange = function(nums, target) {
    const findFirst = () => {
        let left = 0;
        let right = nums.length - 1;
        let index = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                index = mid;
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return index;
    };

    const findLast = () => {
        let left = 0;
        let right = nums.length - 1;
        let index = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                index = mid;
                left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return index;
    };

    return [findFirst(), findLast()];
};


/**
 * 9. Permutation in String
 */
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) {
        return false;
    }

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);

    for (const char of s1) {
        need[char.charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < s2.length; i++) {
        window[s2.charCodeAt(i) - 97]++;

        if (i >= s1.length) {
            window[s2.charCodeAt(i - s1.length) - 97]--;
        }

        if (need.every((count, index) => count === window[index])) {
            return true;
        }
    }

    return false;
};


/**
 * 10. Find All Anagrams in a String
 */
var findAnagrams = function(s, p) {
    const result = [];

    if (p.length > s.length) {
        return result;
    }

    const need = new Array(26).fill(0);
    const window = new Array(26).fill(0);

    for (const char of p) {
        need[char.charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < s.length; i++) {
        window[s.charCodeAt(i) - 97]++;

        if (i >= p.length) {
            window[s.charCodeAt(i - p.length) - 97]--;
        }

        if (need.every((count, index) => count === window[index])) {
            result.push(i - p.length + 1);
        }
    }

    return result;
};