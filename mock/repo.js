import fs from 'fs';
import path from 'path';

const repo = new Map();
const dataFilePath = path.resolve(__dirname, './data.json');

// 从文件加载数据到内存中
const load = () => {
  try {
    // 读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const parsedData = JSON.parse(data);
    // 清空缓存数据
    repo.clear();
    // 遍历解析后的数据，将未过期的键值对存储到内存中
    Object.entries(parsedData).forEach(([key, value]) => {
      if (value.expire === 0 || value.expire >= Date.now()) {
        repo.set(key, value);
      }
    });
  } catch (err) {
    console.error(`无法从文件加载数据: ${dataFilePath}`);
  }
}

// 将内存中的数据保存到文件中
const save = () => {
  try {
    // 将 Map 转换为对象
    const data = {};
    for (const [key, value] of repo.entries()) {
      data[key] = value;
    }
    // 将对象转换为 JSON 格式的字符串并写入文件
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
  } catch (err) {
    console.error(`无法将数据保存到文件: ${dataFilePath}`);
  }
}

// 添加键值对到内存中，可以设置过期时间（单位为毫秒）
const set = (key, value, ttl = 0) => {
  const data = { value, expire: ttl === 0 ? 0 : Date.now() + ttl };
  // 将键值对存储到 Map 中
  repo.set(key, data);
  // 保存到文件中
  save();
}

// 根据键获取值，如果键不存在或已过期则返回 undefined
const get = (key) => {
  const data = repo.get(key);
  if (!data) {
    return undefined;
  }
  if (data.expire !== 0 && Date.now() > data.expire) {
    // 如果键已过期则删除它
    repo.delete(key);
    save();
    return undefined;
  }
  return data.value;
}

// 根据键删除键值对
const del = (key) => {
  repo.delete(key);
  save();
}

// 加载文件数据到内存中
load();

export default {
  set,
  get,
  del
}
