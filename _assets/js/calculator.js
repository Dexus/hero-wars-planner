var calculator = new Vue({
  el : '#calculator',
  data : {
    //guilds: new Array(10)
    guilds: [
      '',
      'Pyro',
      'Knights',
      'Confectioners',
      'Family',
      'Sofa',
      'Twisted',
      'Trium',
      'Atomic',
      'Black',
      'Vagabunden',
    ]
  },
  computed: {
    // Helps render enemy teams in order by power level
    orderedEnemies: function () {
      return orderByPower(this.map.enemySlots);
    },
    // Helps render allied teams in order by power level
    orderedAllies: function () {
      return orderByPower(this.map.ourSlots);
    },
    // Renders total team powers: hero, titan, total
    getAllyPower: function () {
      return getTotalPower(this.map.ourSlots);
    },
    // Renders total enemy team powers: hero, titan, total
    getEnemyPower: function () {
      return getTotalPower(this.map.enemySlots);
    }
  }
});