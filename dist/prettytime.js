define(['i18next'], function (i18n) {
    var units;
    var prettyTime = function (date) {
        this.reference = date || new Date();
    };

    prettyTime.prototype.calculateDuration = function (difference) {
        var absoluteDifference = Math.abs(difference);
        var units = this.getUnits();
        var duration = {};

        for (var i = 0; i < units.length; i++) {
            var unit = units[i];
            var millisPerUnit = Math.abs(unit.millisPerUnit);
            var quantity = Math.abs(unit.maxQuantity);
            var isLastResult = (i === units.length - 1);

            if ((quantity === 0) && !isLastResult) {
                quantity = parseInt(units[i + 1].millisPerUnit / unit.millisPerUnit, 10);
            }

            if ((millisPerUnit * quantity > absoluteDifference) || isLastResult) {
                duration.unit = unit;
                if (millisPerUnit > absoluteDifference) {
                    duration.quantity = getSign(difference);
                    duration.delta = 0;
                } else {
                    duration.quantity = parseInt(difference / millisPerUnit, 10);
                    duration.delta = difference - duration.quantity * millisPerUnit;
                }
                break;
            }
        }

        return duration;
    };

    prettyTime.prototype.approximateDuration = function (then) {
        if (!(then instanceof Date)) {
            throw new Error('Date to approximate is invalid.');
        }
        var difference = then.getTime() - this.reference.getTime();
        return this.calculateDuration(difference);
    };

    prettyTime.prototype.calculatePreciseDuration = function (then) {
        if (!(then instanceof Date)) {
            throw new Error('Date to calculate is invalid.');
        }

        //remove the just now unit as we want precise 
        this.removeUnit("JustNow");

        var results = [];
        var difference = then.getTime() - this.reference.getTime();
        var duration = this.calculateDuration(difference);
        results.push(duration);

        while (duration.delta !== 0) {
            duration = this.calculateDuration(duration.delta);

            //don't duplicate units in the results
            var unitExist = false;
            for (var i = 0; i < results.length; i++) {
                if (results[i].unit.resourcePrefix === duration.unit.resourcePrefix) {
                    unitExist = true;
                    break;
                }
            }

            if (!unitExist) {
                results.push(duration);
            }
        }
        
        return results;
    };

    prettyTime.prototype.format = function (value) {
        if (!value) {
            throw new Error('Please provide a date or a duration');
        }

        var duration = (value instanceof Date)
            ? this.approximateDuration(value) : value;

        var format = getFormatter(duration.unit);
        var time = format.format(duration);
        return format.decorate(duration, time);
    };
    
    prettyTime.prototype.formatUnrounded = function (value) {
        if (!value) {
            throw new Error('Please provide a date or a duration');
        }

        var duration = (value instanceof Date)
            ? this.approximateDuration(value) : value;

        var format = getFormatter(duration.unit);
        var time = format.formatUnrounded(duration);
        return format.decorateUnrounded(duration, time);
    };

    prettyTime.prototype.formatDurations = function (durations) {
        if (!durations) {
            throw new Error('Duration array must not be null.');
        }

        var result = '', duration, format;
        for (var i = 0; i < durations.length; i++) {
            duration = durations[i];
            format = getFormatter(duration.unit);

            var isLast = (i === durations.length - 1);
            if (!isLast) {
                result = result + format.formatUnrounded(duration) + ' ';                
            } else {
                result = result + format.format(duration);
            }
        }
        result = format.decorateUnrounded(duration, result);
        return result;
    };
     
    prettyTime.prototype.formatApproximateDuration = function (date) {
        var duration = this.approximateDuration(date);
        return this.formatDuration(duration);
    };

    prettyTime.prototype.formatDuration = function (duration) {
        var formatter = getFormatter(duration.unit);
        return formatter.format(duration);
    };

    prettyTime.prototype.initUnits = function () {
        units = [
                { maxQuantity: 1000 * 60 * 5, millisPerUnit: 1, resourcePrefix: 'JustNow', },
                { maxQuantity: 0, millisPerUnit: 1, resourcePrefix: 'Millisecond' },
                { maxQuantity: 0, millisPerUnit: 1000, resourcePrefix: 'Second' },
                { maxQuantity: 0, millisPerUnit: 1000 * 60, resourcePrefix: 'Minute' },
                { maxQuantity: 0, millisPerUnit: 1000 * 60 * 60, resourcePrefix: 'Hour' },
                { maxQuantity: 0, millisPerUnit: 1000 * 60 * 60 * 24, resourcePrefix: 'Day' },
                { maxQuantity: 0, millisPerUnit: 1000 * 60 * 60 * 24 * 7, resourcePrefix: 'Week' },
                { maxQuantity: 0, millisPerUnit: 2629743830, resourcePrefix: 'Month' },
                { maxQuantity: 0, millisPerUnit: 2629743830 * 12, resourcePrefix: 'Year' },
                { maxQuantity: 0, millisPerUnit: 315569259747, resourcePrefix: 'Decade' },
                { maxQuantity: 0, millisPerUnit: 3155692597470, resourcePrefix: 'Century' },
                { maxQuantity: 0, millisPerUnit: 31556926000000, resourcePrefix: 'Millennium' }
        ];
    };

    prettyTime.prototype.getUnits = function () {
        if (!units || !units.length) {
            this.initUnits();
        }

        units.sort(function (left, right) {
            if (left.millisPerUnit < right.millisPerUnit) {
                return -1;
            } else if (left.millisPerUnit > right.millisPerUnit) {
                return 1;
            }
            return 0;
        });

        return units;
    };

    prettyTime.prototype.removeUnit = function (unitType) {
        if (units && units.length) {
            var index = -1;
            for (var i = 0; i < units.length; i++) {
                if (units[i].resourcePrefix === unitType) {
                    index = i;
                    break;
                }
            }

            if (index >= 0) {
                units.splice(index, 1);
            }
        }
    };

    prettyTime.prototype.clearUnits = function () {
        units = [];
        return units;
    };

    prettyTime.prototype.registerUnit = function (unit) {
        units.push(unit);
    };

    function getSign(differnce) {
        return 0 > differnce ? -1 : 1;
    }

    function getFormatter(unit) {
        var roundingToloerance = 50;
        var formatter = {
            pattern: i18n.t('prettytime:' + unit.resourcePrefix + 'Pattern'),
            futurePrefix: i18n.t('prettytime:' + unit.resourcePrefix + 'FuturePrefix'),
            futureSuffix: i18n.t('prettytime:' + unit.resourcePrefix + 'FutureSuffix'),
            pastPrefix: i18n.t('prettytime:' + unit.resourcePrefix + 'PastPrefix'),
            pastSuffix: i18n.t('prettytime:' + unit.resourcePrefix + 'PastSuffix'),
            singularName: i18n.t('prettytime:' + unit.resourcePrefix + 'SingularName'),
            pluralName: i18n.t('prettytime:' + unit.resourcePrefix + 'PluralName'),
            futurePluralName: i18n.t('prettytime:' + unit.resourcePrefix + 'FuturePluralName', { defaultValue: '' }),
            futureSingularName: i18n.t('prettytime:' + unit.resourcePrefix + 'FutureSingularName', { defaultValue: '' }),
            pastPluralName: i18n.t('prettytime:' + unit.resourcePrefix + 'PastPluralName', { defaultValue: '' }),
            pastSingularName: i18n.t('prettytime:' + unit.resourcePrefix + 'PastSingularName', { defaultValue: '' })
        };

        formatter.format = function (duration, round) {
            if (round === undefined)
                round = true;

            var sign = duration.quantity < 0 ? '-' : '';
            var unit = getGramaticallyCorrectName(duration, round);
            var quantity = getQuantity(duration, round);

            return applyPattern(sign, unit, quantity);
        };

        formatter.formatUnrounded = function (duration) {
            return formatter.format(duration, false);
        };

        formatter.decorate = function (duration, time) {
            var result;
            if (duration.quantity < 0) {
                result = formatter.pastPrefix + ' ' + time + ' ' + formatter.pastSuffix;
            } else {
                result = formatter.futurePrefix + ' ' + time + ' ' + formatter.futureSuffix;
            }
            return result.replace(new RegExp('\\s+', 'g'), ' ').trim();
        };

        formatter.decorateUnrounded = function (duration, time) {
            return formatter.decorate(duration, time);
        };

        function getQuantity(duration, round) {
            if (round) {
                var quantity = Math.abs(duration.quantity);
                if (duration.delta !== 0) {
                    var threshold = Math.abs((duration.delta / duration.unit.millisPerUnit) * 100);
                    if (threshold > roundingToloerance) {
                        quantity = quantity + 1;
                    }
                }
                return quantity;
            } else {
                return Math.abs(duration.quantity);
            }
        }

        function getGramaticallyCorrectName(duration, round) {
            var result = getSingularName(duration);
            if ((Math.abs(getQuantity(duration, round))) === 0 || (Math.abs(getQuantity(duration, round)) > 1)) {
                result = getPluralName(duration);
            }
            return result;
        }

        function getSingularName(duration) {
            if (duration.quantity >= 0 && formatter.futureSingularName && formatter.futureSingularName.length) {
                return formatter.futureSingularName;
            } else if (duration.quantity < 0 && formatter.pastSingularName && formatter.pastSingularName.length) {
                return formatter.pastSingularName;
            } else {
                return formatter.singularName;
            }
        }

        function getPluralName(duration) {
            if (duration.quantity >= 0 && formatter.futurePluralName && formatter.futurePluralName.length) {
                return formatter.futurePluralName;
            } else if (duration.quantity < 0 && formatter.pastPluralName && formatter.pastPluralName.length) {
                return formatter.pastPluralName;
            } else {
                return formatter.pluralName;
            }
        }

        function applyPattern(sign, unit, quantity) {
            var result = formatter.pattern.replace('%s', sign);
            result = result.replace('%n', quantity);
            result = result.replace('%u', unit);

            return result;
        }

        return formatter;
    }

    return prettyTime;
});