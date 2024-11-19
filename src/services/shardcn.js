import { ShardCN } from 'shardcn'; 

const shardcn = new ShardCN({
  apiKey: import.meta.env.VITE_SHARDCN_API_KEY,
  baseUrl: import.meta.env.VITE_SHARDCN_BASE_URL,
});

export default shardcn;
