import { CalculationSettings } from "../models/CalculationSettings";
import { TableData } from "../models/TableData";
import Api from "./api-service";

export default class CalculationService {
    makeClaculation = async (NewTableSettings: CalculationSettings) => {
        return (
          await Api
            .get(
              `Calculation/MakeCalculation`,
              NewTableSettings,
              (params: any) => {
                return Object.entries(params)
                  .map(([key, value]) => {
                    if (Array.isArray(value) && value) {
                      return value.map((it) => `${key}=${it}`).join("&");
                    }
                    return `${key}=${value}`;
                  })
                  .join("&");
              }
            )
            .catch((error) => {
              throw new Error(error);
            })
        ).data;
      };

    downloadTable = async (tableData: TableData) => {
      return (
        await Api
          .get(
            `Calculation/GetFile`,
            tableData,
            (params: any) => {
              return Object.entries(params)
                .map(([key, value]) => {
                  if (Array.isArray(value) && value) {
                    return value.map((it) => `${key}=${it}`).join("&");
                  }
                  return `${key}=${value}`;
                })
                .join("&");
            }
          )
          .catch((error) => {
            throw new Error(error);
          })
      ).data;
    };
    // downloadTable = async (
    //   newData: TableData
    // ) => {
    //   console.log(newData)
    //   return (await Api.get(`Calculation/GetFile`,newData)).data;
    // };
}