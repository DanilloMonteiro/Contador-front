import useItemUpdater from "@/hooks/useItemUpdater";

export default function handleDateChangeRevision(event, itemId, setContador) {
  const { name, value } = event.target;

  let formattedValue = null;

  if (value) {
    const date = new Date(value);
    formattedValue = date.toISOString().split("T")[0];
  }

  setContador((prevContador) => {
    const splited = name.split(".");

    const updatedContador = prevContador.map((item) => {
      if (itemId === item._id) {
        let activedRevision;
        let nextRevision;
        let days30 = 30;
        if (item.revision.R0.checked === false) {
          activedRevision = "R0";
          nextRevision = "R30";
        } else if (item.revision.R30.checked === false) {
          activedRevision = "R30";
          nextRevision = "R55";
        } else if (item.revision.R55.checked === false) {
          activedRevision = "R55";
          nextRevision = "R80";
        } else if (item.revision.R80.checked === false) {
          activedRevision = "R80";
          nextRevision = "R105";
        } else if (item.revision.R105.checked === false) {
          activedRevision = "R105";
        } else {
          null;
        }

        console.log(item.revision[splited[1]].checked, "dentro 1 ");

        if (item.revision[splited[1]].checked === true) {
          return {
            ...item,
            [splited[0]]: {
              ...item.revision,
              [splited[1]]: {
                ...item.revision[splited[1]],
                [splited[2]]: value
                  ? new Date(value).toISOString().split("T")[0]
                  : null,
                date_filter: true,
              },
            },
          };
        }

        const datetimeRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (item._id === itemId && datetimeRegex.test(formattedValue)) {
          return {
            ...item,
            [splited[0]]: {
              ...item.revision,
              [splited[1]]: {
                ...item.revision[activedRevision],
                [splited[2]]: value
                  ? new Date(value).toISOString().split("T")[0]
                  : null,
                ready_filter: true,
                date_filter: true,
              },
            },
          };
        } else {
          return {
            ...item,
            [splited[0]]: {
              ...item.revision,
              [splited[1]]: {
                ...item.revision[activedRevision],
                [splited[2]]: value
                  ? new Date(value).toISOString().split("T")[0]
                  : null,
              },
            },
          };
        }
      } else {
        return item;
      }
    });

    const updatedContador2 = updatedContador.map((item) => {
      if (itemId === item._id) {
        let activedRevision;
        let nextRevision;
        let stop;
        let days30 = 30;
        if (item.revision.R0.checked === false) {
          activedRevision = "R0";
          nextRevision = "R30";
          stop = 0;
        } else if (item.revision.R30.checked === false) {
          activedRevision = "R30";
          nextRevision = "R55";
          stop = 25000;
        } else if (item.revision.R55.checked === false) {
          activedRevision = "R55";
          nextRevision = "R80";
          stop = 50000;
        } else if (item.revision.R80.checked === false) {
          activedRevision = "R80";
          nextRevision = "R105";
          stop = 75000;
        } else if (item.revision.R105.checked === false) {
          activedRevision = "R105";
        } else {
          null;
        }

        console.log(item.revision[splited[1]].checked, "dentro 2 ");

        if (item.revision[splited[1]].checked === true) {
          return {
            ...item,
            [splited[0]]: {
              ...item.revision,
              [splited[1]]: {
                ...item.revision[splited[1]],
                [splited[2]]: value
                  ? new Date(value).toISOString().split("T")[0]
                  : null,
              },
            },
          };
        }

        const datetimeRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (
          (item._id === itemId &&
            datetimeRegex.test(formattedValue) &&
            item.material === true &&
            item.count_number >= stop) ||
          (item._id === itemId &&
            datetimeRegex.test(formattedValue) &&
            item.material === true &&
            item.date_revision <= days30)
        ) {
          return {
            ...item,
            material: false,
            planing_date: "",
            [splited[0]]: {
              ...item.revision,
              [nextRevision]: {
                ready_filter: false,
                date_filter: true,
                ready: false,
              },
              [splited[1]]: {
                ...item.revision[activedRevision],
                [splited[2]]: value
                  ? new Date(value).toISOString().split("T")[0]
                  : null,
                ready_filter: true,
                date_filter: true,
                checked: true,
              },
            },
          };
        } else {
          return {
            ...item,
            [splited[0]]: {
              ...item.revision,
              [splited[1]]: {
                ...item.revision[activedRevision],
                [splited[2]]: value
                  ? new Date(value).toISOString().split("T")[0]
                  : null,
                checked: false,
              },
            },
          };
        }
      } else {
        return item;
      }
    });

    updatedContador2.forEach((item) => {
      useItemUpdater(itemId, item);
    });

    return updatedContador2;
  });
}
