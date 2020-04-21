import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
  public async sayHello(page?: number): Promise<NewsItem[]> {
    console.log('page', page)
    return [{id: 1, title: '测试'}]
  }
}

export interface NewsItem {
  id: number,
  title: string
}