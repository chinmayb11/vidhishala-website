'use client';

type RecordValue = Record<string, any>;

type QueryResult = {
  data: RecordValue[] | null;
  error: { message: string } | null;
  count?: number;
};

class AdminQuery implements PromiseLike<QueryResult> {
  private filters: Record<string, any> = {};
  private sortColumn: string | null = null;
  private ascending = true;
  private limitCount: number | null = null;
  private operation: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private payload: RecordValue | RecordValue[] | null = null;
  private head = false;

  constructor(private readonly table: string) {}

  select(_columns = '*', options?: { head?: boolean }) { this.operation = 'select'; this.head = Boolean(options?.head); return this; }
  order(column: string, options?: { ascending?: boolean }) { this.sortColumn = column; this.ascending = options?.ascending !== false; return this; }
  limit(count: number) { this.limitCount = count; return this; }
  eq(column: string, value: any) { this.filters[column] = value; return this; }
  insert(payload: RecordValue | RecordValue[]) { this.operation = 'insert'; this.payload = payload; return this; }
  update(payload: RecordValue) { this.operation = 'update'; this.payload = payload; return this; }
  delete() { this.operation = 'delete'; return this; }

  then<TResult1 = QueryResult, TResult2 = never>(onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2> {
    const query = async (): Promise<QueryResult> => {
      const query = new URLSearchParams();
      Object.entries(this.filters).forEach(([key, value]) => query.set(key, String(value)));
      if (this.sortColumn) { query.set('order', this.sortColumn); query.set('ascending', String(this.ascending)); }
      if (this.limitCount !== null) query.set('limit', String(this.limitCount));
      if (this.head) query.set('head', 'true');

      const init: RequestInit = { credentials: 'include', headers: { 'Content-Type': 'application/json' } };
      let response: Response;
      if (this.operation === 'insert') {
        response = await fetch(`/api/admin/${this.table}`, { ...init, method: 'POST', body: JSON.stringify(this.payload) });
      } else if (this.operation === 'update' || this.operation === 'delete') {
        const id = this.filters.id;
        query.delete('id');
        response = await fetch(`/api/admin/${this.table}${id ? `?id=${encodeURIComponent(id)}` : ''}`, { ...init, method: this.operation === 'update' ? 'PATCH' : 'DELETE', body: this.operation === 'update' ? JSON.stringify(this.payload) : undefined });
      } else {
        response = await fetch(`/api/admin/${this.table}?${query.toString()}`, init);
      }
      const body = await response.json().catch(() => ({ data: null, error: { message: 'The admin backend returned an invalid response.' } }));
      return response.ok ? body : { data: null, error: body.error || { message: 'The admin request failed.' } };
    };
    return query().then(onfulfilled as any, onrejected as any);
  }
}

export const adminApi = {
  from(table: string) {
    return new AdminQuery(table);
  },
};
