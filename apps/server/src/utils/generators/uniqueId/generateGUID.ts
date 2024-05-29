/*
FlakeId is used to generate a unique ID (guid). This library typically generates a time-based ID, which is unique and can be considered somewhat sequential since newer IDs are generally larger than older ones. However, the sequential nature here is based on time, not on a simple incremental count.
  */
import FlakeId from "./SnowflakeIdGenerator";

/*
Machine ID Logic:
  Initially, we considered using the EC2 instance ID and passing it to the Snowflake class, but since it's an alphanumeric value and Snowflake only accepts numeric values, we are currently using a `Math.random()` value. In the future, we can modify this approach by assigning unique tags to each EC2 instance. Additionally, we can retrieve all metadata from AWS using the internal IP address (http://169.254.169.254/latest/meta-data/)

*/
const mid = Math.round(Math.random() * 100000);

const generator = new FlakeId({ mid });

const generateGUID = (): string => {
  const guid = generator.generate();
  /*
  If we need a string based unique id, then we can modify it, eg: RCT-123456789-1
   const stringUniqueId = `${prefix}-${format(guid, "hex")}-${checksum}`; */
  return guid;
};

export default generateGUID;
