import request from "../utils/request";

export const addAddress = (data: AddressAddData) => {
  return request.post('/address', data)
}