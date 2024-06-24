import React, { useEffect, useRef, useState } from "react";
import api from "../api";
import printImg from "../Images/download.png";
import SalariesForm from "./SalariesForm";

const InvoiseForm = (props) => {
  const route = props.route;
  const method = props.method;
  const client = props.client;
  const slasRoute = props.slasRoute;

  const invoise = props.invoise;

  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  let pushedDate = `${year}-${month}-${day}`;

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [done, setDone] = useState(false);
  const [paper_taraf, setPaper_taraf] = useState("");
  const [paper_count_before, setPaper_count_before] = useState("");
  const [paper_sal, setPaper_sal] = useState("");
  const [paper_type_one, setPaper_type_one] = useState("");
  const [paper_type_two, setPaper_type_two] = useState("");
  const [paper_size_one, setPaper_size_one] = useState("");
  const [paper_size_two, setPaper_size_two] = useState("");
  const [zenk_taraf, setZenk_taraf] = useState("");
  const [zenk_count_before, setZenk_count_before] = useState("");
  const [zenk_sal, setZenk_sal] = useState("");
  const [print_count_one, setPrint_count_one] = useState("");
  const [print_count_two, setPrint_count_two] = useState("");
  const [print_douple_face, setPrint_douple_face] = useState(false);
  const [color_k, setColor_k] = useState(false);
  const [color_y, setColor_y] = useState(false);
  const [color_m, setColor_m] = useState(false);
  const [color_c, setColor_c] = useState(false);
  const [color_zahabi, setColor_zahabi] = useState(false);
  const [color_faddi, setColor_faddi] = useState(false);
  const [color_sabgha, setColor_sabgha] = useState(false);
  const [color_warnish, setColor_warnish] = useState(false);
  const [color_kohley, setColor_kohley] = useState(false);
  const [color_special, setColor_special] = useState("");
  const [color_back_k, setColor_back_k] = useState(false);
  const [color_back_y, setColor_back_y] = useState(false);
  const [color_back_m, setColor_back_m] = useState(false);
  const [color_back_c, setColor_back_c] = useState(false);
  const [color_back_zahabi, setColor_back_zahabi] = useState(false);
  const [color_back_faddi, setColor_back_faddi] = useState(false);
  const [color_back_sabgha, setColor_back_sabgha] = useState(false);
  const [color_back_warnish, setColor_back_warnish] = useState(false);
  const [color_back_kohley, setColor_back_kohley] = useState(false);
  const [color_back_special, setColor_back_special] = useState("");
  const [daftar_count, setDaftar_count] = useState("");
  const [groups_count, setGroups_count] = useState("");
  const [sorting, setSorting] = useState("");
  const [counting, setCounting] = useState("");
  const [slofan, setSlofan] = useState("");
  const [slofan_ckb, setSlofan_ckb] = useState(false);
  const [slofan_geha, setSlofan_geha] = useState("");
  const [slofan_count, setSlofan_count] = useState("");
  const [uv, setUv] = useState("");
  const [uv_ckb, setUv_ckb] = useState(false);
  const [uv_count, setUv_count] = useState("");
  const [taksir, setTaksir] = useState("");
  const [taksir_ckb, setTaksir_ckb] = useState(false);
  const [taksir_count, setTaksir_count] = useState("");
  const [forma, setForma] = useState("");
  const [forma_ckb, setForma_ckb] = useState(false);
  const [spot, setSpot] = useState("");
  const [spot_ckb, setSpot_ckb] = useState(false);
  const [film, setFilm] = useState("");
  const [film_ckb, setFilm_ckb] = useState(false);
  const [aklasheh, setAklasheh] = useState("");
  const [aklasheh_ckb, setAklasheh_ckb] = useState(false);
  const [aklasheh_sal, setAklasheh_sal] = useState("");
  const [basma, setBasma] = useState("");
  const [basma_ckb, setBasma_ckb] = useState(false);
  const [taglid, setTaglid] = useState("");
  const [taglid_ckb, setTaglid_ckb] = useState(false);
  const [taglid_count, setTaglid_count] = useState("");
  const [taglid_sal, setTaglid_sal] = useState("");
  const [tawdib, setTawdib] = useState("");
  const [tawdib_ckb, setTawdib_ckb] = useState(false);
  const [nakl, setNakl] = useState("");
  const [nakl_ckb, setNakl_ckb] = useState(false);
  const [tasmim, setTasmim] = useState("");
  const [tasmim_ckb, setTasmim_ckb] = useState(false);
  const [khadamat, setKhadamat] = useState("");
  const [khadamat_ckb, setKhadamat_ckb] = useState(false);
  const [salk, setSalk] = useState("");
  const [salk_ckb, setSalk_ckb] = useState(false);
  const [kas, setKas] = useState("");
  const [kas_ckb, setKas_ckb] = useState(false);

  const [sals, setSals] = useState({});
  const [invoiseSals, setInvoiseSals] = useState([]);
  const [updatedInvoiseSals, setUpdatedInvoiseSals] = useState("");
  const [showSals, setShowSals] = useState(false);
  const isFirstChange = useRef(true);

  useEffect(() => {
    getZenkSal();
    if (method === "add") {
      setDate(pushedDate);
    }
    if (method === "edit") {
      setName(invoise.name);
      setDate(invoise.date);
      setDone(invoise.done);
      setPaper_taraf(invoise.paper_taraf);
      setPaper_count_before(invoise.paper_count);
      setPaper_sal(invoise.paper_sal);
      setPaper_type_one(invoise.paper_type_one);
      setPaper_type_two(invoise.paper_type_two);
      setPaper_size_one(invoise.paper_size_one);
      setPaper_size_two(invoise.paper_size_two);
      setZenk_taraf(invoise.zenk_taraf);
      setZenk_count_before(invoise.zenk_count);
      setZenk_sal(invoise.zenk_sal);
      setPrint_count_one(invoise.print_count_one);
      setPrint_count_two(invoise.print_count_two);
      setPrint_douple_face(invoise.print_douple_face);
      setColor_k(invoise.color_k);
      setColor_y(invoise.color_y);
      setColor_m(invoise.color_m);
      setColor_c(invoise.color_c);
      setColor_zahabi(invoise.color_zahabi);
      setColor_faddi(invoise.color_faddi);
      setColor_sabgha(invoise.color_sabgha);
      setColor_warnish(invoise.color_warnish);
      setColor_kohley(invoise.color_kohley);
      setColor_special(invoise.color_special);
      setColor_back_k(invoise.color_back_k);
      setColor_back_y(invoise.color_back_y);
      setColor_back_m(invoise.color_back_m);
      setColor_back_c(invoise.color_back_c);
      setColor_back_zahabi(invoise.color_back_zahabi);
      setColor_back_faddi(invoise.color_back_faddi);
      setColor_back_sabgha(invoise.color_back_sabgha);
      setColor_back_warnish(invoise.color_back_warnish);
      setColor_back_kohley(invoise.color_back_kohley);
      setColor_back_special(invoise.color_back_special);
      setDaftar_count(invoise.daftar_count);
      setGroups_count(invoise.groups_count);
      setSorting(invoise.sorting);
      setCounting(invoise.counting);
      setSlofan(invoise.slofan);
      setSlofan_ckb(invoise.slofan_ckb);
      setSlofan_geha(invoise.slofan_geha);
      setSlofan_count(invoise.slofan_count);
      setUv(invoise.uv);
      setUv_ckb(invoise.uv_ckb);
      setUv_count(invoise.uv_count);
      setTaksir(invoise.taksir);
      setTaksir_ckb(invoise.taksir_ckb);
      setTaksir_count(invoise.taksir_count);
      setForma(invoise.forma);
      setForma_ckb(invoise.forma_ckb);
      setSpot(invoise.spot);
      setSpot_ckb(invoise.spot_ckb);
      setFilm(invoise.film);
      setFilm_ckb(invoise.film_ckb);
      setAklasheh(invoise.aklasheh);
      setAklasheh_ckb(invoise.aklasheh_ckb);
      setAklasheh_sal(invoise.aklasheh_sal);
      setBasma(invoise.basma);
      setBasma_ckb(invoise.basma_ckb);
      setTaglid(invoise.taglid);
      setTaglid_ckb(invoise.taglid_ckb);
      setTaglid_count(invoise.taglid_count);
      setTaglid_sal(invoise.taglid_sal);
      setTawdib(invoise.tawdib);
      setTawdib_ckb(invoise.tawdib_ckb);
      setNakl(invoise.nakl);
      setNakl_ckb(invoise.nakl_ckb);
      setTasmim(invoise.tasmim);
      setTasmim_ckb(invoise.tasmim_ckb);
      setKhadamat(invoise.khadamat);
      setKhadamat_ckb(invoise.khadamat_ckb);
      setSalk(invoise.salk);
      setSalk_ckb(invoise.salk_ckb);
      setKas(invoise.kas);
      setKas_ckb(invoise.kas_ckb);
    }
    getInvoisesSals();
    if (props.method === "edit") {
      setSlofan_count((prevCount) => prevCount * 2);
    }
  }, []);

  useEffect(() => {
    if (slofan_geha === "وجه واحد") {
      setSlofan_count((prevCount) => prevCount / 2);
    } else if (slofan_geha === "وجهين") {
      setSlofan_count((prevCount) => prevCount * 2);
    }
  }, [slofan_geha]);

  const getZenkSal = async () => {
    const res = await api.get("/api/salaries");
    setSals(res.data[0]);
    if (res.data[0] !== undefined) {
      setZenk_sal(res.data[0].zenk_sal);
    } else {
      setZenk_sal(0);
    }
  };

  const getInvoisesSals = async () => {
    const res = await api.get("api/invoisesalaries/");
    const data = await res.data;
    setInvoiseSals(data);
  };

  const postInvoise = async () => {
    let paper_count;
    let zenk_count;
    if (paper_count_before === "") {
      paper_count = 0;
    } else {
      paper_count = paper_count_before;
    }
    if (zenk_count_before === "") {
      zenk_count = 0;
    } else {
      zenk_count = zenk_count_before;
    }
    const invoise = {
      name,
      date,
      done,
      paper_taraf,
      paper_count,
      paper_sal,
      paper_type_one,
      paper_type_two,
      paper_size_one,
      paper_size_two,
      zenk_taraf,
      zenk_count,
      zenk_sal,
      print_count_one,
      print_count_two,
      print_douple_face,
      color_k,
      color_y,
      color_m,
      color_c,
      color_zahabi,
      color_faddi,
      color_sabgha,
      color_warnish,
      color_kohley,
      color_special,
      color_back_k,
      color_back_y,
      color_back_m,
      color_back_c,
      color_back_zahabi,
      color_back_faddi,
      color_back_sabgha,
      color_back_warnish,
      color_back_kohley,
      color_back_special,
      daftar_count,
      groups_count,
      sorting,
      counting,
      slofan,
      slofan_ckb,
      slofan_geha,
      slofan_count,
      uv,
      uv_ckb,
      uv_count,
      taksir,
      taksir_ckb,
      taksir_count,
      forma,
      forma_ckb,
      spot,
      spot_ckb,
      film,
      film_ckb,
      aklasheh,
      aklasheh_ckb,
      aklasheh_sal,
      basma,
      basma_ckb,
      taglid,
      taglid_ckb,
      taglid_count,
      taglid_sal,
      tawdib,
      tawdib_ckb,
      nakl,
      nakl_ckb,
      tasmim,
      tasmim_ckb,
      khadamat,
      khadamat_ckb,
      salk,
      salk_ckb,
      kas,
      kas_ckb,
      client,
    };

    const invoiseSals = {
      k_sal: sals["k_sal"],
      y_sal: sals["y_sal"],
      m_sal: sals["m_sal"],
      c_sal: sals["c_sal"],
      zahabi_sal: sals["zahabi_sal"],
      faddi_sal: sals["faddi_sal"],
      sapgha_sal: sals["sapgha_sal"],
      warnish_sal: sals["warnish_sal"],
      kohley_sal: sals["kohley_sal"],
      special_sal: sals["special_sal"],
      slofan_sal: sals["slofan_sal"],
      taksir_full_sal: sals["taksir_full_sal"],
      taksir_half_sal: sals["taksir_half_sal"],
      taksir_rega_sal: sals["taksir_rega_sal"],
      UV_sal: sals["UV_sal"],
      film_sal: sals["film_sal"],
      zenk_sal: sals["zenk_sal"],
      invoise: name,
    };

    if (method === "add") {
      api.post(route, invoise).catch((e) => {
        console.log("invoise Error");
        console.log(e.response.data);
      });
    } else if (method === "edit") {
      api.patch(route, invoise).catch((e) => console.log(e.response.data));
      api
        .patch(slasRoute, invoiseSals)
        .catch((e) => console.log(e.response.data));
    }
  };

  const salsClicked = () => {
    setShowSals(true);
    invoiseSals.filter((sal) => {
      sal.invoise === name ? setUpdatedInvoiseSals(sal.id) : "";
    });
  };

  const hiddenDateInput = useRef(null);

  const handleVisibleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleHiddenDateChange = (e) => {
    const inputDate = e.target.value;
    setDate(formatToDisplayDate(inputDate));
  };

  const handleVisibleDateClick = () => {
    hiddenDateInput.current.showPicker();
  };

  const formatToDisplayDate = (inputDate) => {
    if (!inputDate) return "";
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatToInputDate = (displayDate) => {
    if (!displayDate) return "";
    const dateParts = displayDate.split("/");
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}/`;
    }
    return "";
  };

  return (
    <>
      <form className="form" onSubmit={() => postInvoise()}>
        <div className="form-invoise-con">
          <div className="inner-con">
            <label>اسم العملية</label>
            <input
              className="form-input name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              required
            />
          </div>
          <div className="inner-con">
            <label>التاريخ</label>
            <input
              type="text"
              className="form-input fit"
              value={date}
              onChange={handleVisibleDateChange}
              onClick={handleVisibleDateClick}
              placeholder="dd/mm/yyyy"
            />
            <input
              type="date"
              ref={hiddenDateInput}
              className="form-input fit"
              style={{ display: "none" }}
              value={formatToInputDate(date)}
              onChange={handleHiddenDateChange}
            />
          </div>
        </div>
        <h1 className="heighlight-text form-heading">الورق</h1>
        <div className="form-invoise-con paper-sec">
          <div className="inner-con">
            <label>طرف</label>
            <select
              className="form-input"
              name="taraf"
              value={paper_taraf}
              onChange={(e) => setPaper_taraf(e.target.value)}
            >
              <option value="" selected></option>
              <option value="المطبعة">المطبعة</option>
              <option value="العميل">العميل</option>
            </select>
          </div>
          <div className="inner-con">
            <label>عدد الافرغ</label>
            <input
              className="form-input"
              type="text"
              value={paper_count_before}
              onChange={(e) => setPaper_count_before(e.target.value)}
              name="paper_count_before"
            />
          </div>
          <div className="inner-con">
            <label>السعر</label>
            <input
              className="form-input"
              type="text"
              value={paper_sal}
              onChange={(e) => setPaper_sal(e.target.value)}
              name="paper_sal"
            />
          </div>
        </div>
        <div className="form-invoise-con">
          <div className="inner-con">
            <label>نوع</label>
            <select
              className="form-input fit"
              name="paper_type_one"
              value={paper_type_one}
              onChange={(e) => setPaper_type_one(e.target.value)}
            >
              <option selected value="">
                اختر نوعاً
              </option>
              <option value="كوشيه">كوشيه</option>
              <option value="طبع">طبع</option>
              <option value="استيكر">استيكر</option>
              <option value="دوبلكس">دوبلكس</option>
              <option value="برستول كوشيه">برستول كوشيه</option>
            </select>
            {paper_type_one === "كوشيه" ? (
              <select
                className="form-input fit"
                name="paper_type_two"
                value={paper_type_two}
                onChange={(e) => setPaper_type_two(e.target.value)}
              >
                <option value="" selected></option>
                <option value="90gm 70%">90gm 70%</option>
                <option value="115gm 70%">115gm 70%</option>
                <option value="130gm 70%">130gm 70%</option>
                <option value="150gm 70%">150gm 70%</option>
                <option value="170gm 70%">170gm 70%</option>
                <option value="200gm 70%">200gm 70%</option>
                <option value="250gm 70%">250gm 70%</option>
                <option value="300gm 70%">300gm 70%</option>
                <option value="350gm 70%">350gm 70%</option>
                <option value="90gm جاير">90gm جاير</option>
                <option value="115gm جاير">115gm جاير</option>
                <option value="130gm جاير">130gm جاير</option>
                <option value="150gm جاير">150gm جاير</option>
                <option value="170gm جاير">170gm جاير</option>
                <option value="200gm جاير">200gm جاير</option>
                <option value="250gm جاير">250gm جاير</option>
                <option value="300gm جاير">300gm جاير</option>
                <option value="350gm جاير">350gm جاير</option>
              </select>
            ) : paper_type_one === "طبع" ? (
              <select
                className="form-input fit"
                name="paper_type_two"
                value={paper_type_two}
                onChange={(e) => setPaper_type_two(e.target.value)}
              >
                <option value="" selected></option>
                <option value="70gm 70%">70gm 70%</option>
                <option value="80gm 70%">80gm 70%</option>
                <option value="100gm 70%">100gm 70%</option>
                <option value="120gm 70%">120gm 70%</option>
                <option value="70gm جاير">70gm جاير</option>
                <option value="80gm جاير">80gm جاير</option>
                <option value="100gm جاير">100gm جاير</option>
                <option value="120gm جاير">120gm جاير</option>
                <option value="ورق كريمي">ورق كريمي</option>
                <option value="مكربن">مكربن</option>
              </select>
            ) : paper_type_one === "استيكر" ? (
              <select
                className="form-input fit"
                name="paper_type_two"
                value={paper_type_two}
                onChange={(e) => setPaper_type_two(e.target.value)}
              >
                <option value="" selected></option>
                <option value="بلاستيك ابيض">بلاستيك ابيض</option>
                <option value="بلاستيك شفاف">بلاستيك شفاف</option>
                <option value="فضي">فضي</option>
                <option value="ذهبي">ذهبي</option>
                <option value="ورق">ورق</option>
              </select>
            ) : paper_type_one === "دوبلكس" ? (
              <select
                className="form-input fit"
                name="paper_type_two"
                value={paper_type_two}
                onChange={(e) => setPaper_type_two(e.target.value)}
              >
                <option value="" selected></option>
                <option value="220gm">220gm</option>
                <option value="250gm">250gm</option>
                <option value="300gm">300gm</option>
                <option value="350gm">350gm</option>
              </select>
            ) : paper_type_one === "برستول كوشيه" ? (
              <select
                className="form-input fit"
                name="paper_type_two"
                value={paper_type_two}
                onChange={(e) => setPaper_type_two(e.target.value)}
              >
                <option value="" selected></option>
                <option value="230gm 70%">230gm 70%</option>
                <option value="250gm 70%">250gm 70%</option>
                <option value="300gm 70%">300gm 70%</option>
                <option value="350gm 70%">350gm 70%</option>
                <option value="250gm جاير">250gm جاير</option>
                <option value="300gm جاير">300gm جاير</option>
              </select>
            ) : (
              <select
                className="form-input fit"
                name="paper_type_two"
                value={paper_type_two}
                onChange={(e) => setPaper_type_two(e.target.value)}
              ></select>
            )}
          </div>
          <div className="inner-con">
            <label>مقاس القص</label>
            <input
              className="form-input small"
              type="text"
              value={paper_size_one}
              onChange={(e) => setPaper_size_one(e.target.value)}
              name="paper_size_one"
            />
            <i className="fa-solid fa-xmark"></i>
            <input
              className="form-input small"
              type="text"
              value={paper_size_two}
              onChange={(e) => setPaper_size_two(e.target.value)}
              name="paper_size_two"
            />
          </div>
        </div>
        <h1 className="heighlight-text form-heading">الزنك</h1>
        <div className="form-invoise-con">
          <div className="inner-con">
            <label>طرف</label>
            <select
              className="form-input"
              name="zenk_taraf"
              value={zenk_taraf}
              onChange={(e) => setZenk_taraf(e.target.value)}
            >
              <option value="" selected></option>
              <option value="المطبعة">المطبعة</option>
              <option value="العميل">العميل</option>
            </select>
          </div>
          <div className="inner-con">
            <label>عدد الزنكات</label>
            <input
              className="form-input"
              type="text"
              value={zenk_count_before}
              onChange={(e) => setZenk_count_before(e.target.value)}
              name="zenk_count_before"
            />
          </div>
          <div className="inner-con">
            <label>السعر</label>
            <input
              className="form-input"
              type="text"
              value={zenk_sal}
              onChange={(e) => setZenk_sal(e.target.value)}
              name="zenk_sal"
            />
          </div>
        </div>
        <h1 className="heighlight-text form-heading">الطباعة</h1>
        <div className="form-invoise-con">
          <div className="inner-con">
            <label>عدد السحبات</label>
            <input
              className="form-input"
              type="text"
              value={print_count_one}
              onChange={(e) => setPrint_count_one(e.target.value)}
              name="print_count_one"
            />
            <input
              className="form-input"
              type="text"
              value={print_count_two}
              onChange={(e) => setPrint_count_two(e.target.value)}
              name="print_count_two"
            />
          </div>
          <div className="inner-con">
            <label>تطبع و تقلب</label>
            <input
              type="checkbox"
              checked={print_douple_face}
              onChange={(e) => {
                setPrint_douple_face(e.target.checked);
              }}
              name="print_douple_face"
            />
          </div>
        </div>
        <div className="form-invoise-con colors borderd">
          <p className="color">K</p>
          <p className="color">Y</p>
          <p className="color">M</p>
          <p className="color">C</p>
          <p className="color">ذهبي</p>
          <p className="color">فضي</p>
          <p className="color">صبغة</p>
          <p className="color">ورنيش</p>
          <p className="color">كحلي</p>
          <p className="color">اسبيشيال</p>
        </div>
        <div className="form-invoise-con">
          <div className="inner-con colors">
            <p className="color-face">وجه</p>
            <input
              className="color"
              type="checkbox"
              checked={color_k}
              onChange={(e) => setColor_k(e.target.checked)}
              name="color_k"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_m}
              onChange={(e) => setColor_m(e.target.checked)}
              name="color_m"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_y}
              onChange={(e) => setColor_y(e.target.checked)}
              name="color_y"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_c}
              onChange={(e) => setColor_c(e.target.checked)}
              name="color_c"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_zahabi}
              onChange={(e) => setColor_zahabi(e.target.checked)}
              name="color_zahabi"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_faddi}
              onChange={(e) => setColor_faddi(e.target.checked)}
              name="color_faddi"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_sabgha}
              onChange={(e) => setColor_sabgha(e.target.checked)}
              name="color_sabgha"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_warnish}
              onChange={(e) => setColor_warnish(e.target.checked)}
              name="color_warnish"
            />
            <input
              className="color"
              type="checkbox"
              checked={color_kohley}
              onChange={(e) => setColor_kohley(e.target.checked)}
              name="color_kohley"
            />
            <input
              className="form-input color"
              type="text"
              value={color_special}
              onChange={(e) => setColor_special(e.target.value)}
              name="color_special"
            />
          </div>
        </div>
        {print_douple_face && (
          <div className="form-invoise-con">
            <div className="inner-con colors">
              <p className="color-face">ظهر</p>
              <input
                className="color"
                type="checkbox"
                checked={color_back_k}
                onChange={(e) => setColor_back_k(e.target.checked)}
                name="color_back_k"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_m}
                onChange={(e) => setColor_back_m(e.target.checked)}
                name="color_back_m"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_y}
                onChange={(e) => setColor_back_y(e.target.checked)}
                name="color_back_y"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_c}
                onChange={(e) => setColor_back_c(e.target.checked)}
                name="color_back_c"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_zahabi}
                onChange={(e) => setColor_back_zahabi(e.target.checked)}
                name="color_back_zahabi"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_faddi}
                onChange={(e) => setColor_back_faddi(e.target.checked)}
                name="color_back_faddi"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_sabgha}
                onChange={(e) => setColor_back_sabgha(e.target.checked)}
                name="color_back_sabgha"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_warnish}
                onChange={(e) => setColor_back_warnish(e.target.checked)}
                name="color_back_warnish"
              />
              <input
                className="color"
                type="checkbox"
                checked={color_back_kohley}
                onChange={(e) => setColor_back_kohley(e.target.checked)}
                name="color_back_kohley"
              />
              <input
                className="form-input color"
                type="text"
                value={color_back_special}
                onChange={(e) => setColor_back_special(e.target.value)}
                name="color_back_special"
              />
            </div>
          </div>
        )}
        <h1 className="heighlight-text form-heading">التجليد والتشطيب</h1>

        <div className="form-invoise-con">
          <div className="inner-con taglid-head-labels">
            <label>عدد الدفاتر</label>
            <label>المجموعات</label>
            <label>الترتيب</label>
            <label>الترقيم</label>
          </div>
        </div>
        <div>
          <div className="form-invoise-con borderd padding">
            <input
              className="form-input"
              type="text"
              value={daftar_count}
              onChange={(e) => setDaftar_count(e.target.value)}
              name="daftar_count"
            />
            <select
              className="form-input"
              value={groups_count}
              onChange={(e) => {
                setGroups_count(e.target.value);
                console.log(e.target);
              }}
              name="groups_count"
            >
              <option value="" selected></option>
              <option value="25">25</option>
              <option value="33">33</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </select>
            <select
              className="form-input"
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
              name="sorting"
            >
              <option value="" selected></option>
              <option value="اول">اول</option>
              <option value="اول + اخير">اول + اخير</option>
              <option value="اول + وسط + اخير">اول + وسط + اخير</option>
              <option value="اول + 2وسط + اخير">اول + 2وسط + اخير</option>
              <option value="اول + 3وسط + اخير">اول + 3وسط + اخير</option>
            </select>
            <div className="inner-con">
              <p>من: </p>
              <input
                className="form-input"
                type="text"
                value={counting}
                onChange={(e) => setCounting(e.target.value)}
                name="counting"
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>سلوفان</label>
              <input
                type="checkbox"
                checked={slofan_ckb}
                onChange={(e) => setSlofan_ckb(e.target.checked)}
                name="slofan_ckb"
              />
              <select
                className="form-input"
                name="slofan"
                value={slofan}
                onChange={(e) => setSlofan(e.target.value)}
              >
                <option value="" selected></option>
                <option value="مط">مط</option>
                <option value="لامع">لامع</option>
              </select>
            </div>
            <div className="inner-con fit">
              <label>الجهه</label>
              <select
                className="form-input"
                name="slofan_geha"
                value={slofan_geha}
                onChange={(e) => setSlofan_geha(e.target.value)}
              >
                <option value="" selected></option>
                <option value="وجه واحد">وجه واحد</option>
                <option value="وجهين">وجهين</option>
              </select>
            </div>
            <div className="inner-con fit">
              <label>العدد النهائي</label>
              <input
                className="form-input"
                type="text"
                name="slofan_count"
                value={slofan_count}
                onChange={(e) => setSlofan_count(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>U.V</label>
              <input
                type="checkbox"
                checked={uv_ckb}
                onChange={(e) => setUv_ckb(e.target.value)}
                name="uv"
              />
              <input
                className="form-input"
                name="uv"
                value={uv}
                onChange={(e) => setUv(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>العدد النهائي</label>
              <input
                className="form-input"
                type="text"
                name="uv_count"
                value={uv_count}
                onChange={(e) => setUv_count(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>تكسير</label>
              <input
                type="checkbox"
                checked={taksir_ckb}
                onChange={(e) => setTaksir_ckb(e.target.checked)}
                name="taksir_ckb"
              />
              <select
                className="form-input"
                name="taksir"
                value={taksir}
                onChange={(e) => setTaksir(e.target.value)}
              >
                <option value="" selected></option>
                <option value="كامل">كامل</option>
                <option value="نصف تكسيره">نصف تكسيره</option>
                <option value="ريجه">ريجه</option>
              </select>
            </div>
            <div className="inner-con fit">
              <label>العدد</label>
              <input
                className="form-input"
                type="text"
                name="taksir_count"
                value={taksir_count}
                onChange={(e) => setTaksir_count(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>فورمة</label>
              <input
                type="checkbox"
                name="forma_ckb"
                checked={forma_ckb}
                onChange={(e) => setForma_ckb(e.target.checked)}
              />
              <input
                className="form-input"
                type="text"
                name="forma"
                value={forma}
                onChange={(e) => setForma(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>اسبوت</label>
              <input
                type="checkbox"
                checked={spot_ckb}
                onChange={(e) => setSpot_ckb(e.target.checked)}
                name="spot_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="spot"
                value={spot}
                onChange={(e) => setSpot(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>فيلم</label>
              <input
                type="checkbox"
                checked={film_ckb}
                onChange={(e) => setFilm_ckb(e.target.checked)}
                name="film_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="spot"
                value={film}
                onChange={(e) => setFilm(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>اكلاشيه</label>
              <input
                type="checkbox"
                checked={aklasheh_ckb}
                onChange={(e) => setAklasheh_ckb(e.target.checked)}
                name="aklasheh_ckb"
              />
              <select
                className="form-input"
                name="aklasheh"
                value={aklasheh}
                onChange={(e) => setAklasheh(e.target.value)}
              >
                <option value="" selected></option>
                <option value="بصمه">بصمه</option>
                <option value="كوفراج">كوفراج</option>
                <option value="بصمه و كوراج">بصمه و كوراج</option>
              </select>
            </div>
            <div className="inner-con fit">
              <label>السعر</label>
              <input
                className="form-input"
                type="text"
                name="aklasheh_sal"
                value={aklasheh_sal}
                onChange={(e) => setAklasheh_sal(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>بصمه</label>
              <input
                type="checkbox"
                checked={basma_ckb}
                onChange={(e) => setBasma_ckb(e.target.checked)}
                name="basma_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="basma"
                value={basma}
                onChange={(e) => setBasma(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>تجليد</label>
              <input
                type="checkbox"
                checked={taglid_ckb}
                onChange={(e) => setTaglid_ckb(e.target.checked)}
                name="taglid_ckb"
              />
              <select
                className="form-input"
                name="taglid"
                value={taglid}
                onChange={(e) => setTaglid(e.target.value)}
              >
                <option value="" selected></option>
                <option value="كرتون">كرتون</option>
                <option value="لف">لف</option>
                <option value="لطش">لطش</option>
                <option value="دبوس">دبوس</option>
                <option value="لصق بونطه">لصق بونطه</option>
                <option value="غراء">غراء</option>
              </select>
            </div>
            <div className="inner-con fit">
              <label>العدد</label>
              <input
                className="form-input"
                type="text"
                name="taglid_count"
                value={taglid_count}
                onChange={(e) => setTaglid_count(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>السعر</label>
              <input
                className="form-input"
                type="text"
                name="taglid_sal"
                value={taglid_sal}
                onChange={(e) => setTaglid_sal(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>توضيب</label>
              <input
                type="checkbox"
                checked={tawdib_ckb}
                onChange={(e) => setTawdib_ckb(e.target.checked)}
                name="tawdib_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="tawdib"
                value={tawdib}
                onChange={(e) => setTawdib(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>تصميم</label>
              <input
                type="checkbox"
                checked={tasmim_ckb}
                onChange={(e) => setTasmim_ckb(e.target.checked)}
                name="tasmim_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="tasmim"
                value={tasmim}
                onChange={(e) => setTasmim(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>سلك</label>
              <input
                type="checkbox"
                checked={salk_ckb}
                onChange={(e) => setSalk_ckb(e.target.checked)}
                name="salk_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="salk"
                value={salk}
                onChange={(e) => setSalk(e.target.value)}
              />
            </div>
          </div>
          <div className="form-invoise-con">
            <div className="inner-con fit">
              <label>نقل</label>
              <input
                type="checkbox"
                checked={nakl_ckb}
                onChange={(e) => setNakl_ckb(e.target.checked)}
                name="nakl_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="nakl"
                value={nakl}
                onChange={(e) => setNakl(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>خدمات</label>
              <input
                type="checkbox"
                checked={khadamat_ckb}
                onChange={(e) => setKhadamat_ckb(e.target.checked)}
                name="khadamat_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="khadamat"
                value={khadamat}
                onChange={(e) => setKhadamat(e.target.value)}
              />
            </div>
            <div className="inner-con fit">
              <label>قص</label>
              <input
                type="checkbox"
                checked={kas_ckb}
                onChange={(e) => setKas_ckb(e.target.checked)}
                name="kas_ckb"
              />
              <input
                className="form-input"
                type="text"
                name="kas"
                value={kas}
                onChange={(e) => setKas(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="btns">
          <button type="submit" className="form-button">
            {method === "add" ? "حفظ الفاتورة" : "تعديل الفاتورة"}
          </button>
          {method === "edit" && (
            <a
              href="#sals-form"
              onClick={salsClicked}
              className="form-button gray"
            >
              الاسعار
            </a>
          )}
          <div className="inner-con">
            <img src={printImg} alt="print-img" onClick={window.print} />
          </div>
        </div>
      </form>
      {showSals && (
        <>
          <div id="sals-form" className="over-layout invoise-sals-layout"></div>
          <div className="sal-form focused invoise-sals">
            <span onClick={() => setShowSals(false)}>
              <i className="fa-solid fa-xmark"></i>
            </span>
            <SalariesForm
              invoiseName={name}
              route={`/api/invoisesalaries/${updatedInvoiseSals}`}
              type="show"
            />
          </div>
        </>
      )}
    </>
  );
};

export default InvoiseForm;
