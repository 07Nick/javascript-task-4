'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let commands = new Map();

    return {

        addCommand: function (event, context, act) {
            if (!commands.has(event)) {
                commands.set(event, new Map());
            }
            if (!commands.get(event).has(context)) {
                commands.get(event).set(context, []);
            }
            commands.get(event).get(context)
                .push(act);
        },

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */

        on: function (event, context, handler) {
            this.addCommand(event, context, { handler, times: Infinity, frequency: 1,
                count: 0 });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */

        off: function (event, context) {
            Array.from(commands.keys()).forEach(key => {
                if (key === event || key.startsWith(event + '.')) {
                    commands.get(event).delete(context);
                }
            });

            return this;
        },

        getEvent: function (event) {
            commands.get(event).forEach((actions, student) => {
                actions.forEach(act => {
                    if (act.count < act.times && (act.count % act.frequency) === 0) {
                        act.handler.call(student);
                    }
                });
            });
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */

        emit: function (event) {
            let second = event.split('.')[0];
            if (commands.has(event)) {
                this.getEvent(event);
            }
            if (commands.has(second) && second !== event) {
                this.getEvent(second);
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event);
            if (times <= 0) {
                times = Infinity;
            }
            this.addCommand(event, context, { handler, times, frequency: 1, count: 0 });
            console.info(commands);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            if (frequency <= 0) {
                frequency = 1;
            }
            this.addCommand(event, context, { handler, times: Infinity, frequency,
                count: 0 });
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
