import TodoStatus from '../../../src/domain/todo/TodoStatus';

{
    describe('testTodoStatus', testTodoStatus);
}

function testTodoStatus() {
    it('static', () => {
        expect(TodoStatus.DISABLE.value).toBe(0);
        expect(TodoStatus.ENABLE.value).toBe(1);
    });
    it('listが返される',() => {
      const actual = TodoStatus.list;
      expect(actual[0].jpName).toBe('無効');
      expect(actual[1].jpName).toBe('有効');
    });
    it('プリミティブ値からドメインを取得することができる',() => {
      const actual = TodoStatus.fromValue(0);
      expect(actual.jpName).toBe('無効');
    })
}
