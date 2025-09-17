import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import api from "../api";

const SalariesForm = (props) => {
  const route = props.route;
  const [sals, setSals] = useState([]);
  const [k_sal, setK_sal] = useState("");
  const [y_sal, setY_sal] = useState("");
  const [m_sal, setM_sal] = useState("");
  const [c_sal, setC_sal] = useState("");
  const [zahabi_sal, setZahabi_sal] = useState("");
  const [faddi_sal, setFaddi_sal] = useState("");
  const [sapgha_sal, setSapgha_sal] = useState("");
  const [warnish_sal, setWarnish_sal] = useState("");
  const [kohley_sal, setKohley_sal] = useState("");
  const [special_sal, setSpecial_sal] = useState("");
  const [slofan_sal, setSlofan_sal] = useState("");
  const [taksir_full_sal, setTaksir_full_sal] = useState("");
  const [taksir_half_sal, setTaksir_half_sal] = useState("");
  const [taksir_rega_sal, setTaksir_rega_sal] = useState("");
  const [UV_sal, setUV_sal] = useState("");
  const [film_sal, setFilm_sal] = useState("");
  const [zenk_sal, setZenk_sal] = useState("");

  useEffect(() => {
    getSals();
  }, []);

  const getSals = async () => {
    const res = await api.get(route);
    const data = await res.data;
    setSals(data);
    if (props.type !== "show") {
      if (data.length !== 0) {
        setK_sal(data[0].k_sal);
        setY_sal(data[0].y_sal);
        setM_sal(data[0].m_sal);
        setC_sal(data[0].c_sal);
        setZahabi_sal(data[0].zahabi_sal);
        setFaddi_sal(data[0].faddi_sal);
        setSapgha_sal(data[0].sapgha_sal);
        setWarnish_sal(data[0].warnish_sal);
        setKohley_sal(data[0].kohley_sal);
        setSpecial_sal(data[0].special_sal);
        setSlofan_sal(data[0].slofan_sal);
        setTaksir_full_sal(data[0].taksir_full_sal);
        setTaksir_half_sal(data[0].taksir_half_sal);
        setTaksir_rega_sal(data[0].taksir_rega_sal);
        setUV_sal(data[0].UV_sal);
        setFilm_sal(data[0].film_sal);
        setZenk_sal(data[0].zenk_sal);
      }
    } else {
      if (data.length !== 0) {
        setK_sal(data.k_sal);
        setY_sal(data.y_sal);
        setM_sal(data.m_sal);
        setC_sal(data.c_sal);
        setZahabi_sal(data.zahabi_sal);
        setFaddi_sal(data.faddi_sal);
        setSapgha_sal(data.sapgha_sal);
        setWarnish_sal(data.warnish_sal);
        setKohley_sal(data.kohley_sal);
        setSpecial_sal(data.special_sal);
        setSlofan_sal(data.slofan_sal);
        setTaksir_full_sal(data.taksir_full_sal);
        setTaksir_half_sal(data.taksir_half_sal);
        setTaksir_rega_sal(data.taksir_rega_sal);
        setUV_sal(data.UV_sal);
        setFilm_sal(data.film_sal);
        setZenk_sal(data.zenk_sal);
      }
    }
  };

  const postSals = async () => {
    let salsForm = {};
    if (props.type === "show") {
      salsForm = {
        k_sal,
        y_sal,
        m_sal,
        c_sal,
        zahabi_sal,
        faddi_sal,
        sapgha_sal,
        warnish_sal,
        kohley_sal,
        special_sal,
        slofan_sal,
        taksir_full_sal,
        taksir_half_sal,
        taksir_rega_sal,
        UV_sal,
        film_sal,
        zenk_sal,
        invoise_name: props.invoiseName,
      };
    } else {
      salsForm = {
        k_sal,
        y_sal,
        m_sal,
        c_sal,
        zahabi_sal,
        faddi_sal,
        sapgha_sal,
        warnish_sal,
        kohley_sal,
        special_sal,
        slofan_sal,
        taksir_full_sal,
        taksir_half_sal,
        taksir_rega_sal,
        UV_sal,
        film_sal,
        zenk_sal,
      };
    }

    if (props.type !== "show") {
      if (sals.length !== 0) {
        await api.patch(`api/salaries/1`, salsForm);
      } else {
        await api.post(route, salsForm);
      }
    } else {
      await api.patch(route, salsForm);
    }
    swal({
      title: "تم تسجيل الاسعار بنجاح",
      icon: "success",
    });
  };

  return (
    <form onSubmit={postSals}>
      <h1 className="heighlight-text form-heading">وضع اسعار الالوان</h1>
      <div className="form-con">
        <div className="inner-con">
          <label>K</label>
          <input
            className="form-input"
            required
            type="text"
            value={k_sal}
            onChange={(e) => setK_sal(e.target.value)}
            name="k_sal"
          />
        </div>
        <div className="inner-con">
          <label>Y</label>
          <input
            className="form-input"
            required
            type="text"
            value={y_sal}
            onChange={(e) => setY_sal(e.target.value)}
            name="y_sal"
          />
        </div>
        <div className="inner-con">
          <label>M</label>
          <input
            className="form-input"
            required
            type="text"
            value={m_sal}
            onChange={(e) => setM_sal(e.target.value)}
            name="m_sal"
          />
        </div>
        <div className="inner-con">
          <label>C</label>
          <input
            className="form-input"
            required
            type="text"
            value={c_sal}
            onChange={(e) => setC_sal(e.target.value)}
            name="c_sal"
          />
        </div>
        <div className="inner-con">
          <label>ذهبي</label>
          <input
            className="form-input"
            required
            type="text"
            value={zahabi_sal}
            onChange={(e) => setZahabi_sal(e.target.value)}
            name="zahabi_sal"
          />
        </div>
        <div className="inner-con">
          <label>فضي</label>
          <input
            className="form-input"
            required
            type="text"
            value={faddi_sal}
            onChange={(e) => setFaddi_sal(e.target.value)}
            name="faddi_sal"
          />
        </div>
        <div className="inner-con">
          <label>صبغه</label>
          <input
            className="form-input"
            required
            type="text"
            value={sapgha_sal}
            onChange={(e) => setSapgha_sal(e.target.value)}
            name="sapgha_sal"
          />
        </div>
        <div className="inner-con">
          <label>ورنيش</label>
          <input
            className="form-input"
            required
            type="text"
            value={warnish_sal}
            onChange={(e) => setWarnish_sal(e.target.value)}
            name="warnish_sal"
          />
        </div>
        <div className="inner-con">
          <label>كحلي</label>
          <input
            className="form-input"
            required
            type="text"
            value={kohley_sal}
            onChange={(e) => setKohley_sal(e.target.value)}
            name="kohley_sal"
          />
        </div>
        <div className="inner-con">
          <label>الاسبيشيال</label>
          <input
            className="form-input"
            required
            type="text"
            value={special_sal}
            onChange={(e) => setSpecial_sal(e.target.value)}
            name="special_sal"
          />
        </div>
      </div>
      <h1 className="heighlight-text form-heading">وضع اسعار التجليد</h1>
      <div className="form-con">
        <div className="inner-con">
          <label>سلوفان</label>
          <input
            className="form-input"
            required
            type="text"
            value={slofan_sal}
            onChange={(e) => setSlofan_sal(e.target.value)}
            name="slofan_sal"
          />
        </div>
        <div className="inner-con">
          <label>UV</label>
          <input
            className="form-input"
            required
            type="text"
            value={UV_sal}
            onChange={(e) => setUV_sal(e.target.value)}
            name="UV_sal"
          />
        </div>
        <div className="inner-con">
          <label>فيلم</label>
          <input
            className="form-input"
            required
            type="text"
            value={film_sal}
            onChange={(e) => setFilm_sal(e.target.value)}
            name="film_sal"
          />
        </div>
        <div className="inner-con">
          <label>الزنك</label>
          <input
            className="form-input"
            required
            type="text"
            value={zenk_sal}
            onChange={(e) => setZenk_sal(e.target.value)}
            name="zenk_sal"
          />
        </div>
        <hr />
        <div className="inner-con last">
          <label>كامل</label>
          <input
            className="form-input"
            required
            type="text"
            value={taksir_full_sal}
            onChange={(e) => setTaksir_full_sal(e.target.value)}
            name="taksir_full_sal"
          />
        </div>
        <div className="inner-con last">
          <label>نصف</label>
          <input
            className="form-input"
            required
            type="text"
            value={taksir_half_sal}
            onChange={(e) => setTaksir_half_sal(e.target.value)}
            name="taksir_half_sal"
          />
        </div>
        <div className="inner-con">
          <label>ريجه</label>
          <input
            className="form-input"
            required
            type="text"
            value={taksir_rega_sal}
            onChange={(e) => setTaksir_rega_sal(e.target.value)}
            name="taksir_rega_sal"
          />
        </div>
      </div>
      {props.type !== "show" ? (
        <button type="submit" className="form-button">
          تسجيل الاسعار
        </button>
      ) : (
        <button type="button" onClick={postSals} className="form-button">
          تعديل الاسعار
        </button>
      )}
    </form>
  );
};

export default SalariesForm;
