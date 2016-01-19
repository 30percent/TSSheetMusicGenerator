define(["require", "exports", "../lib/lodash"], function (require, exports, _) {
    //var math = Libs.math;
    var Note = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
    function createNoteList() {
    }
    // what does this do?
    function matchToSum(list, mCount) {
        var finalDeq = [], sum = 0;
        _.forEach(list, function (item, ind) {
            var temp = sum + item, tempMatch;
            if (temp > mCount) {
                if ((mCount - sum) < temp) {
                    tempMatch = finalDeq.pop() | 0;
                    tempMatch += mCount - sum;
                }
                else {
                    tempMatch = list.shift();
                    tempMatch -= temp - mCount;
                }
                sum = 0;
            }
            else {
                tempMatch = list.shift();
                sum += tempMatch;
            }
            finalDeq.push(tempMatch);
        });
        return finalDeq;
    }
    var MajorKey = [0, 2, 4, 5, 7, 9, 11], NatMinor = [0, 2, 3, 4, 7, 8, 10], HarmMinor = [0, 2, 3, 5, 7, 8, 11];
    var Key = (function () {
        function Key(baseNote, key) {
            if (key === void 0) { key = MajorKey; }
            this.key = key;
            this.baseNote = baseNote.toLowerCase();
            this.baseInd = _.findIndex(Note, function (note) {
                return note === baseNote;
            });
        }
        /**
         * Takes integer, finds note that matches within set key. The index may be greater than
         * 12, though it's just modulus if so.
         * @param index {number}
         * @returns {string}
         */
        Key.prototype.getNoteFromKey = function (index) {
            var num = (this.baseInd + this.key[index]) % 12;
            return Note[num];
        };
        Key.prototype.getScale = function () {
            var myThis = this;
            return _.times(this.key.length, function (ind) {
                return myThis.getNoteFromKey(ind);
            });
        };
        Key.prototype.temporary = function (list, mCount) {
            return matchToSum(list, mCount);
        };
        Key.prototype.sigFromAccidentals = function (count, scale) {
            if (scale === void 0) { scale = "major"; }
            //TODO: do...
        };
        Key.prototype.matchingScale = function () {
            //TODO: finds appropriate minor for major (or vis versa)
        };
        return Key;
    })();
    return Key;
});
